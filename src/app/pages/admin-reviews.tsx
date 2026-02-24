import { useState, useEffect } from "react";
import { AdminLayout } from "@/app/components/admin-layout";
import { Plus, Edit2, Trash2, Save, X, Star, Eye, EyeOff, User } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl: string;
  isActive: boolean;
  createdAt: string;
}

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    author: "",
    rating: 5,
    text: "",
    date: new Date().toISOString().split("T")[0],
    avatarUrl: "",
    isActive: true,
  });

  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/reviews`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setReviews(result.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      author: "",
      rating: 5,
      text: "",
      date: new Date().toISOString().split("T")[0],
      avatarUrl: "",
      isActive: true,
    });
    setEditingId(null);
  };

  const handleEdit = (review: Review) => {
    setFormData({
      author: review.author,
      rating: review.rating,
      text: review.text,
      date: review.date,
      avatarUrl: review.avatarUrl,
      isActive: review.isActive,
    });
    setEditingId(review.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `${apiUrl}/reviews/${editingId}`
        : `${apiUrl}/reviews`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        await fetchReviews();
        setShowForm(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie diese Bewertung wirklich löschen?")) return;

    try {
      const response = await fetch(`${apiUrl}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        await fetchReviews();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleToggleActive = async (review: Review) => {
    try {
      const response = await fetch(`${apiUrl}/reviews/${review.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ ...review, isActive: !review.isActive }),
      });

      const result = await response.json();
      if (result.success) {
        await fetchReviews();
      }
    } catch (error) {
      console.error("Error toggling review:", error);
    }
  };

  const activeCount = reviews.filter((r) => r.isActive).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#172545] mb-2">
              Bewertungen Verwaltung
            </h1>
            <p className="text-[#586477]">
              Verwalten Sie Google Bewertungen für Ihre Website
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Neue Bewertung
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-[#586477] text-sm">Gesamt Bewertungen</h3>
            </div>
            <p className="text-[#172545] text-3xl font-bold">{reviews.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-[#586477] text-sm">Aktiv (sichtbar)</h3>
            </div>
            <p className="text-[#172545] text-3xl font-bold">{activeCount}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-[#586477] text-sm">Inaktiv (versteckt)</h3>
            </div>
            <p className="text-[#172545] text-3xl font-bold">
              {reviews.length - activeCount}
            </p>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-[#586477]">Lade Bewertungen...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-12 text-center">
              <Star className="w-12 h-12 mx-auto mb-3 text-[#586477]/40" />
              <p className="text-[#586477]">Noch keine Bewertungen vorhanden</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-[#172545]">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-[#172545]">
                      Autor
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-[#172545]">
                      Bewertung
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-[#172545]">
                      Text
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-[#172545]">
                      Datum
                    </th>
                    <th className="text-right p-4 text-sm font-semibold text-[#172545]">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleActive(review)}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            review.isActive
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                          title={review.isActive ? "Sichtbar" : "Versteckt"}
                        >
                          {review.isActive ? (
                            <Eye className="w-5 h-5" />
                          ) : (
                            <EyeOff className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {review.avatarUrl ? (
                            <img
                              src={review.avatarUrl}
                              alt={review.author}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-[#172545] rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <span className="text-[#172545] font-medium">
                            {review.author}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-[#172545] font-semibold">
                            {review.rating}/5
                          </span>
                        </div>
                      </td>
                      <td className="p-4 max-w-md">
                        <p className="text-[#586477] text-sm line-clamp-2">
                          {review.text}
                        </p>
                      </td>
                      <td className="p-4 text-[#586477] text-sm">
                        {new Date(review.date).toLocaleDateString("de-DE")}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(review)}
                            className="p-2 text-[#172545] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Bearbeiten"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Löschen"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#172545]">
                {editingId ? "Bewertung bearbeiten" : "Neue Bewertung"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-[#586477] hover:text-[#172545]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#172545] mb-2">
                  Autor Name *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#586477]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545]"
                  placeholder="z.B. Max Mustermann"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#172545] mb-2">
                  Bewertung (Sterne) *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-[#172545] font-semibold">
                    {formData.rating}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#172545] mb-2">
                  Bewertungstext *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#586477]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545] min-h-[120px]"
                  placeholder="Bewertungstext eingeben..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#172545] mb-2">
                  Datum *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#586477]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#172545] mb-2">
                  Avatar URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, avatarUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#586477]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545]"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-[#586477]/30 text-[#172545] focus:ring-2 focus:ring-[#172545]"
                />
                <label htmlFor="isActive" className="text-[#172545] font-medium">
                  Bewertung auf der Website anzeigen
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border border-[#586477]/30 text-[#172545] rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? "Speichern" : "Erstellen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
