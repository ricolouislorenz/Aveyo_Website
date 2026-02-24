import { useState, useEffect } from "react";
import { AdminLayout } from "@/app/components/admin-layout";
import { Building2, Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Home, MapPin, Euro, Maximize, BedDouble, Upload, ImageIcon } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router";
import {
  validateImage,
  generateDescriptiveFilename,
  resizeImageIfNeeded,
  getRecommendedDimensionsText,
  DEFAULT_PROPERTY_IMAGE_OPTIONS,
  type ImageValidationResult,
} from "@/app/utils/image-validator";

// Default property image placeholder
const defaultPropertyImage = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop";

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  size: number;
  rooms: number;
  description: string;
  features: string[];
  imageUrl: string;
  status: "available" | "reserved" | "sold";
  createdAt: string;
}

export function AdminImmobilienPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    type: "Eigentumswohnung",
    location: "",
    price: 0,
    size: 0,
    rooms: 0,
    description: "",
    features: [],
    imageUrl: "",
    status: "available",
  });

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/");
    } else {
      fetchProperties();
    }
  }, [isAuthenticated, navigate]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${apiUrl}/properties`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setProperties(result.data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${apiUrl}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        await fetchProperties();
        setShowForm(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating property:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(`${apiUrl}/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        await fetchProperties();
        setEditingId(null);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie diese Immobilie wirklich löschen?")) return;

    try {
      const response = await fetch(`${apiUrl}/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        await fetchProperties();
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const startEdit = (property: Property) => {
    setEditingId(property.id);
    setFormData(property);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "Eigentumswohnung",
      location: "",
      price: 0,
      size: 0,
      rooms: 0,
      description: "",
      features: [],
      imageUrl: "",
      status: "available",
    });
  };

  const propertyTypes = [
    "Eigentumswohnung",
    "Einfamilienhaus",
    "Mehrfamilienhaus",
    "Gewerbeimmobilie",
    "Neubau-Projekt",
    "Bestandsimmobilie",
  ];

  // Handle image file selection with validation
  const handleImageFile = async (file: File) => {
    // Get file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';

    // Validate image
    const validation = await validateImage(file, DEFAULT_PROPERTY_IMAGE_OPTIONS);

    if (!validation.valid) {
      alert(`Bildvalidierung fehlgeschlagen:\n${validation.error}`);
      return;
    }

    // Generate descriptive filename
    const descriptiveName = generateDescriptiveFilename(
      'property',
      {
        title: formData.title,
        location: formData.location,
        timestamp: new Date(),
      },
      fileExtension
    );

    console.log(`✅ Bild validiert: ${validation.width}×${validation.height}px, ${validation.size?.toFixed(2)}MB`);
    console.log(`📝 Vorgeschlagener Dateiname: ${descriptiveName}`);

    // Check if resize is needed
    if (
      validation.width &&
      validation.height &&
      (validation.width > DEFAULT_PROPERTY_IMAGE_OPTIONS.maxWidth! ||
        validation.height > DEFAULT_PROPERTY_IMAGE_OPTIONS.maxHeight!)
    ) {
      try {
        const { blob, width, height } = await resizeImageIfNeeded(
          file,
          DEFAULT_PROPERTY_IMAGE_OPTIONS.maxWidth!,
          DEFAULT_PROPERTY_IMAGE_OPTIONS.maxHeight!
        );
        
        console.log(`🔧 Bild automatisch skaliert: ${width}×${height}px`);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setFormData({ ...formData, imageUrl: base64String });
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Fehler beim Skalieren des Bildes:', error);
        alert('Fehler beim Skalieren des Bildes. Bitte versuchen Sie es erneut.');
      }
    } else {
      // No resize needed
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, imageUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageFile(files[0]);
    }
  };

  // Handle file input click
  const handleFileInputClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files && files[0]) {
        handleImageFile(files[0]);
      }
    };
    input.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#172545] mb-2">
              Immobilien Verwaltung
            </h1>
            <p className="text-[#586477]">
              Verwalten Sie Ihre Immobilien-Angebote
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Neue Immobilie
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {(showForm || editingId) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-[#172545]">
                  {editingId ? "Immobilie bearbeiten" : "Neue Immobilie"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="text-[#586477] hover:text-[#172545]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-1">
                    Titel
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545]"
                    placeholder="z.B. Moderne 3-Zimmer Wohnung"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-1">
                    Typ
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545] text-[#172545] bg-white"
                    style={{ color: '#172545' }}
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type} style={{ color: '#172545' }}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-1">
                    Standort
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545]"
                    placeholder="z.B. München - Schwabing"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#172545] mb-1">
                      Preis (€)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#172545] mb-1">
                      Größe (m²)
                    </label>
                    <input
                      type="number"
                      value={formData.size}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          size: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#172545] mb-1">
                      Zimmer
                    </label>
                    <input
                      type="number"
                      value={formData.rooms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rooms: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-1">
                    Beschreibung
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545]"
                    placeholder="Beschreibung der Immobilie..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-1">
                    Ausstattung (kommagetrennt)
                  </label>
                  <input
                    type="text"
                    value={formData.features?.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        features: e.target.value
                          .split(",")
                          .map((f) => f.trim()),
                      })
                    }
                    className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545]"
                    placeholder="z.B. Balkon, Einbauküche, Tiefgarage"
                  />
                </div>

                {/* Drag & Drop Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-2">
                    Immobilienbild
                  </label>
                  <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-800">
                        <p className="font-medium mb-1">Bildanforderungen:</p>
                        <p>{getRecommendedDimensionsText(DEFAULT_PROPERTY_IMAGE_OPTIONS)}</p>
                        <p className="mt-1">Bilder werden automatisch optimiert und erhalten einen aussagekräftigen Namen.</p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={handleFileInputClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer ${
                      isDragging
                        ? "border-[#172545] bg-[#172545]/5"
                        : "border-[#586477]/30 hover:border-[#172545]/50 hover:bg-gray-50"
                    }`}
                  >
                    {formData.imageUrl ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center">
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="max-h-48 rounded-lg object-cover"
                          />
                        </div>
                        <p className="text-center text-sm text-[#586477]">
                          Klicken oder Drag & Drop zum Ändern
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-[#586477]" />
                        <p className="text-[#172545] font-medium mb-1">
                          Bild hochladen
                        </p>
                        <p className="text-sm text-[#586477]">
                          Klicken Sie hier oder ziehen Sie ein Bild hierher
                        </p>
                        <p className="text-xs text-[#586477] mt-2">
                          Unterstützte Formate: JPG, PNG, WebP
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as Property["status"],
                      })
                    }
                    className="w-full px-4 py-2 border border-[#586477]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172545] text-[#172545] bg-white"
                    style={{ color: '#172545' }}
                  >
                    <option value="available" style={{ color: '#172545' }}>Verfügbar</option>
                    <option value="reserved" style={{ color: '#172545' }}>Reserviert</option>
                    <option value="sold" style={{ color: '#172545' }}>Verkauft</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() =>
                      editingId ? handleUpdate(editingId) : handleCreate()
                    }
                    disabled={isSaving}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                      isSaving
                        ? "bg-[#586477] cursor-not-allowed opacity-70"
                        : "bg-[#172545] text-white hover:bg-[#0d1a30]"
                    }`}
                  >
                    <Save className={`w-5 h-5 ${isSaving ? 'animate-spin' : ''}`} />
                    {isSaving ? "Wird gespeichert..." : "Speichern"}
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      resetForm();
                    }}
                    disabled={isSaving}
                    className={`px-6 py-3 border border-[#586477]/30 rounded-xl transition-all duration-300 ${
                      isSaving
                        ? "text-[#586477]/50 cursor-not-allowed"
                        : "text-[#586477] hover:bg-gray-50"
                    }`}
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Properties List */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-[#586477]">Lade Immobilien...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <Home className="w-16 h-16 mx-auto mb-4 text-[#586477]/40" />
            <p className="text-[#586477] text-lg">
              Noch keine Immobilien vorhanden
            </p>
            <p className="text-[#586477]/70">
              Erstellen Sie Ihre erste Immobilie mit dem Button oben
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white border border-[#586477]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-6">
                  <img
                    src={property.imageUrl || defaultPropertyImage}
                    alt={property.title}
                    className="w-48 h-48 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl text-[#172545] mb-2">
                          {property.title}
                        </h3>
                        <div className="flex gap-4 text-sm text-[#586477]">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {property.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {property.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(property)}
                          className="p-2 text-[#172545] hover:bg-[#172545]/10 rounded-lg transition-all duration-300"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-[#172545]">
                        <Euro className="w-5 h-5 text-[#586477]" />
                        <span className="font-semibold">
                          {property.price.toLocaleString("de-DE")} €
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#172545]">
                        <Maximize className="w-5 h-5 text-[#586477]" />
                        <span>{property.size} m²</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#172545]">
                        <BedDouble className="w-5 h-5 text-[#586477]" />
                        <span>{property.rooms} Zimmer</span>
                      </div>
                    </div>

                    <p className="text-[#586477] mb-4 line-clamp-2">
                      {property.description}
                    </p>

                    {property.features && property.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {property.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#172545]/10 text-[#172545] text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          property.status === "available"
                            ? "bg-green-100 text-green-700"
                            : property.status === "reserved"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {property.status === "available"
                          ? "Verfügbar"
                          : property.status === "reserved"
                          ? "Reserviert"
                          : "Verkauft"}
                      </span>
                      <span className="text-sm text-[#586477]">
                        Erstellt:{" "}
                        {new Date(property.createdAt).toLocaleDateString(
                          "de-DE"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}