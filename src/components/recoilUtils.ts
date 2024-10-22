export const calculateRecoil = (attachments: any[]) => {
  let vertrec = 0;
  let horirec = 0;
  let ammo = 556; // Default ammo

  attachments.forEach((attachment) => {
    if (attachment.vrec) {
      vertrec += parseFloat(attachment.vrec);
    }
    if (attachment.hrec) {
      horirec += parseFloat(attachment.hrec);
    }
    if (attachment.family === "ammo") {
      ammo = attachment.id; // Set the ammo type if attachment is ammo
    }
  });

  return { vertrec, horirec, ammo };
};

// Function to generate bullets based on recoil and ammo type
export const generateBullets = (
  recoil: { vertrec: number; horirec: number; ammo: number },
  bulletCount: number = 20
) => {
  const { vertrec, horirec, ammo } = recoil;
  const newBullets = [];

  // Base recoil for ammo types
  const ammoRecoil: Record<
    number,
    { vertical: number[]; horizontal: number[] }
  > = {
    556: { vertical: [26, 27], horizontal: [3, 4] },
    762: { vertical: [35, 36], horizontal: [5, 6] },
  };

  const baseRecoil = ammoRecoil[ammo as 556 | 762] || {
    vertical: [25, 26],
    horizontal: [3, 4],
  };

  let accumulatedVertical = 0;
  let accumulatedHorizontal = 0;

  for (let i = 0; i < bulletCount; i++) {
    // Calculate random base recoil within the range
    const baseVertical =
      Math.random() * (baseRecoil.vertical[1] - baseRecoil.vertical[0]) +
      baseRecoil.vertical[0];
    const baseHorizontal =
      Math.random() * (baseRecoil.horizontal[1] - baseRecoil.horizontal[0]) +
      baseRecoil.horizontal[0];

    // Apply recoil reductions
    const finalVertical = baseVertical * (1 + vertrec / 100);

    // Randomly decide whether to go left (-1) or right (+1)
    const direction = Math.random() < 0.5 ? -1 : 1;
    const finalHorizontal = baseHorizontal * (1 + horirec / 100) * direction;

    accumulatedVertical += finalVertical;
    accumulatedHorizontal += finalHorizontal;

    // Push the accumulated positions as the bullet's position
    newBullets.push({
      vertical: accumulatedVertical,
      horizontal: accumulatedHorizontal,
    });
  }

  return newBullets;
};
