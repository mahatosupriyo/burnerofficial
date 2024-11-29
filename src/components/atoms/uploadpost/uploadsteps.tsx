"use client";
import React, { useState, useRef } from "react";
import { createPost } from "@/app/actions/post";
import { motion } from "framer-motion";
import styles from "./uploader.module.scss";
import Icon from "../icons";

interface PostCreationStepsProps {
  onClose: (success: boolean) => void;
}

const PostCreationSteps: React.FC<PostCreationStepsProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [link, setLink] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("NONE");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tagOptions = ["NONE", "UI", "LOGO", "ILLUSTRATION", "FONT", "POSTER", "ADS", "RESEARCH", "EDITORIAL"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error("File is required!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);
    if (caption) formData.append("caption", caption);
    if (link) formData.append("link", link);
    formData.append("tags", selectedTag);

    try {
      const result = await createPost(formData);
      if (result.success) {
        onClose(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      onClose(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.step}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.hiddenInput}
              ref={fileInputRef}
            />
            <motion.button
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
              onClick={() => fileInputRef.current?.click()}
              className={`${styles.actionButton} ${styles.uploadButton}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="83"
                height="120"
                viewBox="0 0 83 120"
                fill="none"
              >
                <path
                  d="M1 57.6454L10.8814 67.3877L34.2629 43.5887V118.604H48.1804V43.4495L72.2577 67.3877L82 57.6454L41.2216 16.7279L1 57.6454Z"
                  stroke="url(#paint0_radial_3527_69)"
                />
                <path
                  d="M77.1289 1H5.87113V14.9175H77.1289V1Z"
                  stroke="url(#paint1_radial_3527_69)"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_3527_69"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(42 56) rotate(90) scale(63 322.56)"
                  >
                    <stop stopColor="#975F5B" />
                    <stop offset="1" stopColor="#4C4C4C" />
                  </radialGradient>
                  <radialGradient
                    id="paint1_radial_3527_69"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(42 56) rotate(90) scale(63 322.56)"
                  >
                    <stop stopColor="#975F5B" />
                    <stop offset="1" stopColor="#4C4C4C" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.button>
          </div>
        );
      case 2:
        return (
          <div className={styles.step}>
            {preview && <img src={preview} alt="Preview" className={styles.previewImage} />}
            <div className={styles.tagSelector}>
              {tagOptions.map((tag) => (
                <label key={tag} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="postTag"
                    value={tag}
                    checked={selectedTag === tag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className={styles.radioInput}
                  />
                  <p className={styles.tag}>{tag}</p>
                  <p className={styles.hiddentag}>{tag}</p>
                </label>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className={styles.actionButton}
            >
              <Icon name="next" />
            </button>
          </div>
        );
      case 3:
        return (
          <div className={styles.captionStep}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Write something about it"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className={styles.inputField}
              />
              <input
                type="url"
                placeholder="Share a source URL"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className={styles.inputField}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`${styles.actionButton} ${
                isSubmitting ? styles.disabledButton : styles.publishButton
              }`}
            >
              <Icon name="upload" fill="#111" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className={styles.postCreationSteps}>{renderStep()}</div>;
};

export default PostCreationSteps;
