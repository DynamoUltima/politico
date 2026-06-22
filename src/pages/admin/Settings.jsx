import React, { useState, useRef, useEffect } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAppContext } from '../../context/AppContext';
import { defaultAboutContent } from '../../constants/aboutContent';

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80';

export default function Settings() {
  const {
    mpPhotoURL, updateMpProfile, aboutContent, updateAboutContent,
    heroBannerImages, addHeroBannerImage, removeHeroBannerImage,
  } = useAppContext();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const [heroUploading, setHeroUploading] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [heroError, setHeroError] = useState('');
  const heroFileRef = useRef(null);

  const [aboutForm, setAboutForm] = useState(defaultAboutContent);
  const [newAchievement, setNewAchievement] = useState('');
  const [aboutSaving, setAboutSaving] = useState(false);
  const [aboutSuccess, setAboutSuccess] = useState(false);

  useEffect(() => {
    if (aboutContent) setAboutForm({ ...defaultAboutContent, ...aboutContent });
  }, [aboutContent]);

  const updateAboutField = (field, value) =>
    setAboutForm(prev => ({ ...prev, [field]: value }));

  const updateVisionCard = (index, field, value) =>
    setAboutForm(prev => ({
      ...prev,
      visionCards: prev.visionCards.map((c, i) => i === index ? { ...c, [field]: value } : c),
    }));

  const addVisionCard = () =>
    setAboutForm(prev => ({ ...prev, visionCards: [...prev.visionCards, { title: '', description: '' }] }));

  const removeVisionCard = (index) =>
    setAboutForm(prev => ({ ...prev, visionCards: prev.visionCards.filter((_, i) => i !== index) }));

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    setAboutForm(prev => ({ ...prev, achievements: [...prev.achievements, newAchievement.trim()] }));
    setNewAchievement('');
  };

  const handleRemoveAchievement = (index) =>
    setAboutForm(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setAboutSaving(true);
    setAboutSuccess(false);
    await updateAboutContent(aboutForm);
    setAboutSaving(false);
    setAboutSuccess(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setSuccess(false);
    setError('');
  };

  const handleUpload = () => {
    const file = fileRef.current?.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess(false);

    const storageRef = ref(storage, 'mp/profile');
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      'state_changed',
      (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      (err) => { setError(err.message); setUploading(false); },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        await updateMpProfile(url);
        setUploading(false);
        setSuccess(true);
        setPreview(null);
        fileRef.current.value = '';
      }
    );
  };

  const currentPhoto = preview || mpPhotoURL || DEFAULT_PHOTO;

  const handleHeroFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHeroError('');
    handleHeroUpload(file);
  };

  const handleHeroUpload = (file) => {
    setHeroUploading(true);
    setHeroError('');

    const path = `hero_banner/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      'state_changed',
      (snap) => setHeroProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      (err) => { setHeroError(err.message); setHeroUploading(false); },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        await addHeroBannerImage({ url, path });
        setHeroUploading(false);
        heroFileRef.current.value = '';
      }
    );
  };

  const handleRemoveHeroImage = async (image) => {
    if (!window.confirm('Remove this banner image?')) return;
    await removeHeroBannerImage(image);
    if (image.path) {
      deleteObject(ref(storage, image.path)).catch(() => {});
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">MP Profile Settings</h1>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-base font-semibold text-gray-700 mb-6">Profile Photo</h2>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Avatar preview */}
          <div className="w-36 h-36 rounded-full border-4 border-gray-100 shadow-md overflow-hidden shrink-0">
            <img src={currentPhoto} alt="MP avatar" className="w-full h-full object-cover object-top" />
          </div>

          <div className="flex-1 space-y-4 w-full">
            <p className="text-sm text-gray-500 leading-relaxed">
              Upload a photo of the Member of Parliament. It will appear on the public About page.
              Recommended: square image, at least 400×400px.
            </p>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />

            {uploading && (
              <div className="space-y-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-gray-500">Uploading… {progress}%</p>
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            {success && (
              <p className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
                <iconify-icon icon="solar:check-circle-bold" width="16"></iconify-icon>
                Photo updated successfully.
              </p>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading || !preview}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? 'Uploading…' : 'Save Photo'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-base font-semibold text-gray-700 mb-1">Homepage Hero Banner</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Upload images for the rotating background carousel behind the homepage headline. They cycle automatically every few seconds.
        </p>

        {heroBannerImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {heroBannerImages.map((image) => (
              <div key={image.url} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img src={image.url} alt="Hero banner" className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemoveHeroImage(image)}
                  className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Remove image"
                >
                  <iconify-icon icon="solar:trash-bin-trash-bold" width="16"></iconify-icon>
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={heroFileRef}
          type="file"
          accept="image/*"
          onChange={handleHeroFileChange}
          disabled={heroUploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50"
        />

        {heroUploading && (
          <div className="space-y-1 mt-3">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${heroProgress}%` }} />
            </div>
            <p className="text-xs text-gray-500">Uploading… {heroProgress}%</p>
          </div>
        )}

        {heroError && <p className="text-sm text-red-500 mt-3">{heroError}</p>}
      </div>

      <form onSubmit={handleSaveAbout} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">
        <div>
          <h2 className="text-base font-semibold text-gray-700 mb-1">About Page Content</h2>
          <p className="text-sm text-gray-500">Edit the text shown on the public About page, site header, and footer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">MP Name</label>
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
              value={aboutForm.name}
              onChange={(e) => updateAboutField('name', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">District</label>
            <input
              type="text"
              placeholder="e.g. 4th District"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
              value={aboutForm.district}
              onChange={(e) => updateAboutField('district', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">Badge / Title</label>
            <input
              type="text"
              placeholder="e.g. Member of Parliament"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
              value={aboutForm.badge}
              onChange={(e) => updateAboutField('badge', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">Tagline</label>
            <input
              type="text"
              placeholder="e.g. Serving the 4th District since 2018"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
              value={aboutForm.tagline}
              onChange={(e) => updateAboutField('tagline', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase">Biography</label>
          <textarea
            rows="5"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none resize-none"
            value={aboutForm.bio}
            onChange={(e) => updateAboutField('bio', e.target.value)}
          />
        </div>

        {/* Vision Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-500 uppercase">Political Vision Cards</label>
            <button
              type="button"
              onClick={addVisionCard}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <iconify-icon icon="solar:add-circle-linear" width="16"></iconify-icon> Add Card
            </button>
          </div>
          <div className="space-y-3">
            {aboutForm.visionCards.map((card, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    placeholder="Card title"
                    className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-blue-500 outline-none"
                    value={card.title}
                    onChange={(e) => updateVisionCard(i, 'title', e.target.value)}
                  />
                  <textarea
                    rows="2"
                    placeholder="Card description"
                    className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-blue-500 outline-none resize-none"
                    value={card.description}
                    onChange={(e) => updateVisionCard(i, 'description', e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeVisionCard(i)}
                  className="text-gray-300 hover:text-red-500 transition-colors shrink-0 self-start sm:self-center"
                >
                  <iconify-icon icon="solar:trash-bin-trash-linear" width="18"></iconify-icon>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-500 uppercase">Achievements in Office</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Add an achievement..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAchievement(); } }}
            />
            <button
              type="button"
              onClick={handleAddAchievement}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shrink-0"
            >
              Add
            </button>
          </div>
          {aboutForm.achievements.length === 0 ? (
            <p className="text-sm text-gray-400 py-1">No achievements yet.</p>
          ) : (
            <ul className="space-y-1.5">
              {aboutForm.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start justify-between gap-4 bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 text-sm">
                  <span className="text-gray-700 flex-1">{achievement}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(i)}
                    className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                  >
                    <iconify-icon icon="solar:trash-bin-trash-linear" width="16"></iconify-icon>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={aboutSaving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {aboutSaving ? 'Saving…' : 'Save About Page'}
          </button>
          {aboutSuccess && (
            <p className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
              <iconify-icon icon="solar:check-circle-bold" width="16"></iconify-icon>
              About page updated successfully.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
