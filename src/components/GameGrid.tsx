import { useContext, useRef, useState } from "react";
import useAttachments from "../hooks/useAttachments";
import AttachmentContext from "./AttachmentContextType";
import React from "react";

const GameGrid = () => {
  const { data, isLoading, error } = useAttachments();
  const { attachments, dispatch } = useContext(AttachmentContext);

  const formRef = useRef<HTMLFormElement>(null);
  const [bullets, setBullets] = useState<
    { vertical: number; horizontal: number }[]
  >([]);

  if (isLoading) return <h1> ... Loading data </h1>;
  if (error) throw error;

  const attachmentTypes = [
    { type: "ammo", label: "Ammo" },
    { type: "muzzles", label: "Muzzles" },
    { type: "grips", label: "Grips" },
    { type: "stocks", label: "Stocks" },
  ];

  // Reset radio buttons
  const resetRadioButtons = () => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll("input[type=radio]");
      inputs.forEach((input) => {
        (input as HTMLInputElement).checked = false;
      });
    }
  };

  const calculateRecoil = () => {
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

  // Generate bullet positions based on recoil
  const generateBullets = () => {
    const { vertrec, horirec, ammo } = calculateRecoil();
    const bulletCount = 20; // Number of bullets
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

    setBullets(newBullets); // Update state with new bullet positions
  };

  return (
    <div className="main-area">
      <section className="left">
        <form ref={formRef} onSubmit={(e) => e?.preventDefault()}>
          {attachmentTypes.map(({ type, label }, index) => (
            <section className="attachment-selection" key={index}>
              <h2>{label}</h2>
              <div className="attachment-grid">
                {data?.[type as keyof typeof data] &&
                  Object.values(data[type as keyof typeof data]!).map((res) => (
                    <label key={res.id}>
                      <input
                        onClick={() =>
                          dispatch({
                            type: "ADD",
                            attachmentFamily: res.family,
                            attachment: { ...res },
                          })
                        }
                        type="radio"
                        name={type}
                        value={res.id}
                      />
                      <img src={res.img} alt={label.toLowerCase()} />
                    </label>
                  ))}
              </div>
            </section>
          ))}
        </form>
        <div className="attachment-selection button-group">
          <button
            onClick={() => {
              generateBullets(); // Generate bullets based on recoil
            }}
          >
            Generate
          </button>

          <button
            onClick={() => {
              dispatch({ type: "RESET", attachments: [] });
              resetRadioButtons();
              setBullets([]); // Clear bullet positions when reset
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="right">
        <div
          className="attachment-selection bullet-container"
          style={{
            position: "relative",
          }}
        >
          <p>
            20 bullets (10m) <br />
            <span style={{ paddingRight: "10px" }}>
              {calculateRecoil().vertrec}%V
            </span>
            <span>{calculateRecoil().horirec}%H</span>
          </p>

          {bullets.map((bullet, index) => (
            <img
              src="/assets/bullethole.webp"
              key={index}
              style={{
                position: "absolute",
                left: `calc(40% + ${bullet.horizontal}px)`,
                top: `calc(100% - ${bullet.vertical}px)`,
                width: "12px",
                height: "12px",
                backgroundColor: "magenta",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
        <div className="pros-cons">
          <h2>Pros & Cons</h2>
          {attachments.map((a) => (
            <React.Fragment key={a.id}>
              <div>
                {Array.isArray(a.pros) ? (
                  a.pros.map((pro, index) => <p key={index}>{pro}</p>)
                ) : (
                  <p>{a.pros}</p>
                )}
              </div>
              <div>
                {Array.isArray(a.cons) ? (
                  a.cons.map((con, index) => <p key={index}>{con}</p>)
                ) : (
                  <p>{a.cons}</p>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GameGrid;
