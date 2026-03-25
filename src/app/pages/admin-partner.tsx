import { useState, useEffect } from "react";
import { AdminLayout } from "@/app/components/admin-layout";
import { Handshake, Plus, Edit2, Trash2, Save, X, ImageIcon, User, Download } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router";
import {
  validateImage,
  generateDescriptiveFilename,
  resizeImageIfNeeded,
  DEFAULT_PROFILE_IMAGE_OPTIONS,
  DEFAULT_PROPERTY_IMAGE_OPTIONS,
} from "@/app/utils/image-validator";

interface Partner {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
  teamPhotoUrl: string;
  createdAt: string;
}

type ImageField = "logoUrl" | "teamPhotoUrl";

// Die 3 bestehenden Partner mit ihren statischen Bildpfaden
const EXISTING_PARTNERS = [
  {
    name: "SOLVE Rechtsanwälte & Steuerberatung",
    url: "https://www.solve-law.de/",
    logoUrl: "/images/partners/solve/logo_640.webp",
    teamPhotoUrl: "/images/partners/solve/team_640.webp",
  },
  {
    name: "Finanzierungsberatung Martin Mühle",
    url: "https://www.martinmuehle.de/",
    logoUrl: "/images/partners/martin/logo_640.webp",
    teamPhotoUrl: "/images/partners/martin/team_640.webp",
  },
  {
    name: "Ganz einfach Ø 1.172€ Steuern zurückholen",
    url: "https://taxfix.de/finanzberater-adrian-nerhoff/",
    logoUrl: "/images/partners/taxfix/logo_640.webp",
    teamPhotoUrl: "/images/partners/taxfix/team_640.webp",
  },
];

export function AdminPartnerPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingTeam, setIsDraggingTeam] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: "",
    url: "",
    logoUrl: "",
    teamPhotoUrl: "",
  });

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      fetchPartners();
    }
  }, [isAuthenticated, navigate]);

  const fetchPartners = async () => {
    try {
      const response = await fetch(`${apiUrl}/partners`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.success) setPartners(result.data);
    } catch (error) {
      console.error("Fehler beim Laden der Partner:", error);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  const handleImportExisting = async () => {
    setIsImporting(true);
    let imported = 0;
    try {
      for (const p of EXISTING_PARTNERS) {
        const response = await fetch(`${apiUrl}/partners`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(p),
        });
        const result = await response.json();
        if (result.success) imported++;
      }
      await fetchPartners();
      showSuccess(`${imported} bestehende Partner erfolgreich importiert.`);
    } catch {
      showError("Fehler beim Importieren der Partner.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.name?.trim()) {
      showError("Bitte geben Sie einen Partnernamen ein.");
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch(`${apiUrl}/partners`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        await fetchPartners();
        resetForm();
        showSuccess("Partner erfolgreich angelegt.");
      } else {
        showError(result.error || "Fehler beim Anlegen des Partners.");
      }
    } catch {
      showError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!formData.name?.trim()) {
      showError("Bitte geben Sie einen Partnernamen ein.");
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch(`${apiUrl}/partners/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        await fetchPartners();
        resetForm();
        showSuccess("Partner erfolgreich aktualisiert.");
      } else {
        showError(result.error || "Fehler beim Aktualisieren des Partners.");
      }
    } catch {
      showError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/partners/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const result = await response.json();
      if (result.success) {
        await fetchPartners();
        setDeleteConfirmId(null);
        showSuccess("Partner erfolgreich gelöscht.");
      } else {
        showError(result.error || "Fehler beim Löschen des Partners.");
      }
    } catch {
      showError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    }
  };

  const startEdit = (partner: Partner) => {
    setFormData({ name: partner.name, url: partner.url, logoUrl: partner.logoUrl, teamPhotoUrl: partner.teamPhotoUrl });
    setEditingId(partner.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", url: "", logoUrl: "", teamPhotoUrl: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleImageFile = async (file: File, field: ImageField) => {
    const options = field === "logoUrl" ? DEFAULT_PROFILE_IMAGE_OPTIONS : DEFAULT_PROPERTY_IMAGE_OPTIONS;
    const validation = await validateImage(file, options);

    if (!validation.valid) {
      showError(validation.error || "Ungültiges Bild.");
      return;
    }

    const fileExtension = file.name.split(".").pop() || "jpg";
    generateDescriptiveFilename(
      field === "logoUrl" ? "logo" : "team",
      { title: formData.name, timestamp: new Date() },
      fileExtension
    );

    const needsResize =
      validation.width &&
      validation.height &&
      options.maxWidth &&
      options.maxHeight &&
      (validation.width > options.maxWidth || validation.height > options.maxHeight);

    const readFile = (blob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(blob);
    };

    if (needsResize) {
      try {
        const { blob } = await resizeImageIfNeeded(file, options.maxWidth!, options.maxHeight!);
        readFile(blob);
      } catch {
        showError("Fehler beim Skalieren des Bildes.");
      }
    } else {
      readFile(file);
    }
  };

  const makeDragHandlers = (field: ImageField, setDragging: (v: boolean) => void) => ({
    onDragOver: (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragging(true); },
    onDragLeave: (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragging(false); },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault(); e.stopPropagation(); setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleImageFile(file, field);
    },
  });

  const handleFileClick = (field: ImageField) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleImageFile(file, field);
    };
    input.click();
  };

  const ImageDropZone = ({
    field,
    label,
    hint,
    isDragging,
    setDragging,
    icon: Icon,
  }: {
    field: ImageField;
    label: string;
    hint: string;
    isDragging: boolean;
    setDragging: (v: boolean) => void;
    icon: React.ElementType;
  }) => (
    <div>
      <label className="block text-sm font-medium text-[#172545] mb-2">{label}</label>
      <div
        {...makeDragHandlers(field, setDragging)}
        onClick={() => handleFileClick(field)}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-[#172545] bg-[#172545]/5"
            : "border-gray-300 hover:border-[#172545]/50 hover:bg-gray-50"
        }`}
      >
        {formData[field] ? (
          <div className="relative">
            <img
              src={formData[field]}
              alt={label}
              className="max-h-40 mx-auto rounded-lg object-contain"
            />
            <p className="text-xs text-[#586477] mt-2">Klicken oder ziehen zum Ersetzen</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
              <Icon className="w-6 h-6 text-[#586477]" />
            </div>
            <p className="text-sm font-medium text-[#172545]">
              Bild hierher ziehen oder <span className="text-[#586477] underline">durchsuchen</span>
            </p>
            <p className="text-xs text-[#586477]">{hint}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#172545] mb-2">Partner Verwaltung</h1>
            <p className="text-[#586477]">Verwalten Sie Ihre Partnerunternehmen</p>
          </div>
          <div className="flex items-center gap-3">
            {partners.length === 0 && !loading && (
              <button
                onClick={handleImportExisting}
                disabled={isImporting}
                className="flex items-center gap-2 px-5 py-3 border border-[#172545] text-[#172545] rounded-xl hover:bg-[#172545]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                {isImporting ? "Importiere..." : "Bestehende importieren"}
              </button>
            )}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Neuer Partner
            </button>
          </div>
        </div>

        {/* Success / Error Messages */}
        {successMessage && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#172545]">
                  {editingId ? "Partner bearbeiten" : "Neuer Partner"}
                </h2>
                <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[#586477]" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-2">
                    Partnername <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="z.B. Muster GmbH"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545]/20 focus:border-[#172545]"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm font-medium text-[#172545] mb-2">
                    Website-URL
                  </label>
                  <input
                    type="url"
                    value={formData.url || ""}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://www.beispiel.de"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545]/20 focus:border-[#172545]"
                  />
                </div>

                {/* Logo Upload */}
                <ImageDropZone
                  field="logoUrl"
                  label="Partner-Logo"
                  hint="JPG, PNG oder WebP · max. 3 MB · empfohlen 400×400 px"
                  isDragging={isDraggingLogo}
                  setDragging={setIsDraggingLogo}
                  icon={ImageIcon}
                />

                {/* Team Photo Upload */}
                <ImageDropZone
                  field="teamPhotoUrl"
                  label="Team-Foto"
                  hint="JPG, PNG oder WebP · max. 5 MB · empfohlen 800×600 px"
                  isDragging={isDraggingTeam}
                  setDragging={setIsDraggingTeam}
                  icon={User}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-200 text-[#586477] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={editingId ? handleUpdate : handleCreate}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Speichern..." : "Speichern"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-xl font-bold text-[#172545] mb-3">Partner löschen?</h2>
              <p className="text-[#586477] mb-6">
                Dieser Partner wird unwiderruflich gelöscht. Möchten Sie fortfahren?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-6 py-3 border border-gray-200 text-[#586477] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Löschen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Partner List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 rounded-full border-4 border-[#172545]/20 border-t-[#172545] animate-spin" />
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-[#586477]" />
            </div>
            <h3 className="text-lg font-semibold text-[#172545] mb-1">Noch keine Partner</h3>
            <p className="text-[#586477]">
              Klicken Sie auf <strong>„Bestehende importieren"</strong>, um die 3 vorhandenen Partner zu übernehmen, oder legen Sie einen neuen an.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Team Photo */}
                {partner.teamPhotoUrl ? (
                  <img
                    src={partner.teamPhotoUrl}
                    alt={`${partner.name} Team`}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-300" />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-1">
                    {/* Logo */}
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={`${partner.name} Logo`}
                        className="w-12 h-12 object-contain rounded-lg border border-gray-100 bg-white p-1 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <ImageIcon className="w-5 h-5 text-gray-300" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-[#172545] truncate">{partner.name}</h3>
                      {partner.url && (
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#586477] hover:underline truncate block"
                        >
                          {partner.url.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => startEdit(partner)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[#586477] hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(partner.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
