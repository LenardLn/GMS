import { useContext, useRef, useState } from "react";
import useAttachments from "../hooks/useAttachments";
import AttachmentContext from "./AttachmentContextType";
import React from "react";
import resetRadioButtons from "./resetRadioButtons";
import { calculateRecoil, generateBullets } from "./recoilUtils"; // Import recoil functions

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
              const recoil = calculateRecoil(attachments); // Calculate recoil based on attachments
              const newBullets = generateBullets(recoil); // Generate bullets based on the recoil data
              setBullets(newBullets); // Update bullet state
            }}
          >
            Generate
          </button>

          <button
            onClick={() => {
              dispatch({ type: "RESET", attachments: [] });
              resetRadioButtons(formRef); // Reset radio buttons
              setBullets([]); // Clear bullet positions
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
              {calculateRecoil(attachments).vertrec}%V
            </span>
            <span>{calculateRecoil(attachments).horirec}%H</span>
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
