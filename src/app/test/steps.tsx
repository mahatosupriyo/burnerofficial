"use client";
import React, { useState, useRef } from "react";
import { createPost } from "@/app/actions/post";
import Icon from "@/components/atoms/icons";
import styles from "./test.module.scss";

interface PostCreationStepsProps {
  onClose: (success: boolean) => void;
}

const PostCreationSteps: React.FC<PostCreationStepsProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);
    if (caption) formData.append("caption", caption);
    if (link) formData.append("link", link);

    try {
      const result = await createPost(formData);
      if (result.success) {
        onClose(true); // Notify success and close the drawer
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      onClose(false); // Notify failure without closing the drawer
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>Select an Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.hiddenInput}
              ref={fileInputRef}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`${styles.actionButton} ${styles.uploadButton}`}
            >
              <Icon name="upload" size={24} fill="#fff" />
              <span className={styles.buttonText}>Select Image</span>
            </button>
          </div>
        );
      case 2:
        return (
          <div className={styles.step}>
            {preview && <img src={preview} alt="Preview" className={styles.previewImage} />}
            <button
              onClick={() => setStep(3)}
              className={styles.actionButton}
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>Add Details</h2>
            <input
              type="text"
              placeholder="Caption (optional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="url"
              placeholder="Source link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={styles.inputField}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`${styles.actionButton} ${
                isSubmitting ? styles.disabledButton : styles.publishButton
              }`}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
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
