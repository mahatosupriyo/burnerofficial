"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";
import styles from "./uploader.module.scss";
import Icon from "@/components/atoms/icons";
import SuccessPopup from "@/app/success/successpop";
import PostCreationSteps from "./uploadsteps";

const UploadControls = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const handlePostSuccess = (successMessage: string) => {
    setMessage(successMessage);
    setShowPopup(true);
    setIsDrawerOpen(false); // Close the drawer after success
    router.refresh();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setMessage(null);
  };

  return (
    <div className={styles.controlswraper}>
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="bottom">
        <Drawer.Trigger asChild>
          <button className={styles.addPostButton}>
            <Icon name="upload" size={28} fill="#666" />
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className={styles.drawerOverlay} onClick={() => setIsDrawerOpen(false)} />
          <Drawer.Content className={styles.drawerContent}>
            <div className={styles.drawerBody}>
              <PostCreationSteps
                onClose={(success) => {
                  if (success) handlePostSuccess("Post created successfully");
                }}
              />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <SuccessPopup
        message={message}
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default UploadControls;
