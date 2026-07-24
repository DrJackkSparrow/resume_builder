import React, { useRef, useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Upload, X } from 'lucide-react';

const inputStyles = "w-full bg-zinc-950 text-zinc-100 border-b border-zinc-800 pb-2 mb-4 focus:border-zinc-400 focus:outline-none transition-colors placeholder-zinc-600 text-sm";
const labelStyles = "block text-xs font-medium text-zinc-500 mb-1 tracking-wide uppercase";

const PersonalInfoForm = () => {
  const { data, updatePersonalInfo } = useResumeStore();
  const info = data.personalInfo;
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Limit to 2MB
    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width !== img.height) {
          setError('Image must have a 1:1 (square) aspect ratio.');
          return;
        }
        updatePersonalInfo('profilePicUrl', event.target.result);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    updatePersonalInfo('profilePicUrl', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      <div className="col-span-2">
        <label className={labelStyles}>Full Name</label>
        <input 
          type="text" 
          value={info.name} 
          onChange={(e) => updatePersonalInfo('name', e.target.value)}
          className={inputStyles}
          placeholder="Jane Doe"
        />
      </div>
      <div className="col-span-2">
        <label className={labelStyles}>Professional Title</label>
        <input 
          type="text" 
          value={info.title} 
          onChange={(e) => updatePersonalInfo('title', e.target.value)}
          className={inputStyles}
          placeholder="Software Engineer"
        />
      </div>
      <div>
        <label className={labelStyles}>Email</label>
        <input 
          type="email" 
          value={info.email} 
          onChange={(e) => updatePersonalInfo('email', e.target.value)}
          className={inputStyles}
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label className={labelStyles}>Phone</label>
        <input 
          type="tel" 
          value={info.phone} 
          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
          className={inputStyles}
          placeholder="(555) 555-5555"
        />
      </div>
      <div>
        <label className={labelStyles}>LinkedIn</label>
        <input 
          type="text" 
          value={info.linkedin} 
          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
          className={inputStyles}
          placeholder="linkedin.com/in/jane"
        />
      </div>
      <div>
        <label className={labelStyles}>GitHub</label>
        <input 
          type="text" 
          value={info.github} 
          onChange={(e) => updatePersonalInfo('github', e.target.value)}
          className={inputStyles}
          placeholder="github.com/jane"
        />
      </div>

      </div>
      
      <div className="pt-4 border-t border-zinc-800">
        <label className="flex items-center gap-2 cursor-pointer mb-4">
          <input 
            type="checkbox" 
            checked={info.includeProfilePic}
            onChange={(e) => updatePersonalInfo('includeProfilePic', e.target.checked)}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-zinc-100 accent-zinc-500 cursor-pointer"
          />
          <span className="text-sm font-medium text-zinc-300">Include Profile Picture on Supported Templates</span>
        </label>

        {info.includeProfilePic && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            {error && (
              <div className="mb-4 text-xs font-medium text-red-400 bg-red-400/10 p-2 rounded-md">
                {error}
              </div>
            )}
            
            {info.profilePicUrl ? (
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img 
                    src={info.profilePicUrl} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border border-zinc-700"
                  />
                  <button 
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="text-xs text-zinc-500">
                  <p>Image uploaded successfully.</p>
                  <p className="mt-1">It will automatically be cropped as a circle on supported templates.</p>
                </div>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-zinc-700 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-zinc-500 hover:bg-zinc-900/80 transition-all cursor-pointer relative"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                <Upload size={24} className="text-zinc-500 mb-3" />
                <p className="text-sm font-medium text-zinc-300 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
                <p className="text-xs text-amber-500 mt-2 font-medium">Strict requirement: Must be a 1:1 square image.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
