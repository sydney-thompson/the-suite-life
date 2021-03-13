import React, { useState } from "react";

export function rejectDelay(reason) {
  const t = 500;
  return new Promise((resolve, reject) => {
    setTimeout(reject.bind(null, reason), t);
  });
}
