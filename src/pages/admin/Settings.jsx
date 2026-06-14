import React, { useState, useRef } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAppContext } from '../../context/AppContext';

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80';

export default function Settings() {
  const { mpPhotoURL, updateMpProfile } = useAppContext();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
    </div>
  );
}
