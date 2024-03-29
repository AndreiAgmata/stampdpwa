"use client";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/Scanner.scss";

const Scanner = ({ triggerScan, onQRCodeScanned }) => {
  const scannerRef = useRef(null);

  const scan = useCallback(
    (action) => {
      if (action === "close" && scannerRef.current?.getState() === 1) {
        return;
      }
      if (!scannerRef.current?.getState()) {
        console.log("creating scanner");
        scannerRef.current = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        const qrCodeSuccessCallback = (decodedText) => {
          scannerRef.current.stop();
          onQRCodeScanned(decodedText);
        };
        scannerRef.current.start(
          { facingMode: "environment" },
          config,
          qrCodeSuccessCallback
        );
      }
    },
    [onQRCodeScanned]
  );

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        if (scannerRef.current.getState() === 2) {
          scannerRef.current.stop();
        }
        console.log("here");
        scannerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (triggerScan !== "") {
      scan(triggerScan);
    }
  }, [triggerScan, scan]);

  return (
    <>
      {/* <div id="reader" style={{ width: "465px", height: "465px" }}></div> */}
      <div id="reader"></div>
    </>
  );
};

export default Scanner;
