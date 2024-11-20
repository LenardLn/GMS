import { useContext, useRef, useState } from "react";
import useAttachments from "../hooks/useAttachments";
import AttachmentContext from "./AttachmentContextType";
import resetRadioButtons from "./resetRadioButtons";
import { calculateRecoil, generateBullets } from "./recoilUtils";
import { Attachment } from "../entities/Attachment";

const GameGrid = () => {
  const { data, isLoading, error } = useAttachments();
  const { attachments, dispatch } = useContext(AttachmentContext);

  const formRef = useRef<HTMLFormElement>(null);
  const [bullets1, setBullets1] = useState<
    { vertical: number; horizontal: number }[]
  >([]);
  const [bullets2, setBullets2] = useState<
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

  const getProsAndCons = (loadout: "loadout1" | "loadout2") => {
    const loadoutAttachments = attachments[loadout] || [];

    const pros: string[] = loadoutAttachments.flatMap(
      (a: Attachment) => a.pros || []
    );
    const cons: string[] = loadoutAttachments.flatMap(
      (a: Attachment) => a.cons || []
    );

    return { pros, cons };
  };

  return (
    <div className="main-area">
      <section className="left">
        <form
          style={{ marginBottom: "10px" }}
          ref={formRef}
          onSubmit={(e) => e?.preventDefault()}
        >
          {attachmentTypes.map(({ type, label }, index) => (
            <section className="attachment-selection" key={index}>
              <h2 className="label-name">{label}</h2>
              <div className="attachment-grid">
                {data?.[type as keyof typeof data] &&
                  Object.values(data[type as keyof typeof data]!).map((res) => (
                    <div key={res.id}>
                      <img
                        className="attachment-images"
                        src={res.img}
                        alt={label.toLowerCase()}
                      />
                      <div className="input-fields">
                        <label>
                          <input
                            onClick={() =>
                              dispatch({
                                type: "ADD",
                                loadout: "loadout1",
                                attachmentFamily: res.family,
                                attachment: { ...res },
                              })
                            }
                            type="radio"
                            name={`${type}-loadout1`}
                            value={res.id}
                          />
                        </label>

                        <span className="separator">|</span>

                        <label key={res.id}>
                          <input
                            onClick={() =>
                              dispatch({
                                type: "ADD",
                                loadout: "loadout2",
                                attachmentFamily: res.family,
                                attachment: { ...res },
                              })
                            }
                            type="radio"
                            name={`${type}-loadout2`}
                            value={res.id}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </form>
        <div className="attachment-selection button-group">
          <button
            onClick={() => {
              dispatch({ type: "RESET", loadout: "loadout1" });
              resetRadioButtons(formRef, "loadout1");
              setBullets1([]);
            }}
          >
            &#8635; Loadout 1
          </button>
          <button
            onClick={() => {
              dispatch({ type: "RESET", loadout: "loadout2" });
              resetRadioButtons(formRef, "loadout2");
              setBullets2([]);
            }}
          >
            &#8635; Loadout 2
          </button>
          <button
            onClick={() => {
              const recoil1 = calculateRecoil(attachments.loadout1);
              const recoil2 = calculateRecoil(attachments.loadout2);
              const newBullets1 = generateBullets(recoil1);
              const newBullets2 = generateBullets(recoil2);
              setBullets1(newBullets1);
              setBullets2(newBullets2);
            }}
          >
            Generate Loadouts
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
          <p className="rec-stats">
            20 bullets (10m) <br /> <br />
            <span style={{ paddingRight: "10px" }}>
              {calculateRecoil(attachments.loadout1).vertrec}%V
            </span>
            <span>{calculateRecoil(attachments.loadout1).horirec}%H</span>
            <span style={{ paddingRight: "10px", marginLeft: "30px" }}>
              {calculateRecoil(attachments.loadout2).vertrec}%V
            </span>
            <span>{calculateRecoil(attachments.loadout2).horirec}%H</span>
          </p>
          {bullets1.map((bullet, index) => (
            <img
              src="/assets/bullethole.webp"
              key={index}
              style={{
                position: "absolute",
                left: `calc(35% + ${bullet.horizontal}px)`,
                top: `calc(100% - ${bullet.vertical}px)`,
                width: "12px",
                height: "12px",
                backgroundColor: "magenta",
                borderRadius: "50%",
              }}
            />
          ))}
          {bullets2.map((bullet, index) => (
            <img
              src="/assets/bullethole.webp"
              key={index}
              style={{
                position: "absolute",
                left: `calc(65% + ${bullet.horizontal}px)`,
                top: `calc(101% - ${bullet.vertical}px)`,
                width: "12px",
                height: "12px",
                backgroundColor: "purple",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>

        <div>
          <div className="pros-cons">
            <h2> Loadout 1 Stats</h2>
            <div>
              {getProsAndCons("loadout1").pros.length > 0 ? (
                getProsAndCons("loadout1").pros.map((pro, index) => (
                  <p key={index}>{pro}</p>
                ))
              ) : (
                <p>No stats to show</p>
              )}
            </div>
            <div>
              {getProsAndCons("loadout1").cons.map((con, index) => (
                <p key={index}>{con}</p>
              ))}
            </div>
          </div>

          <div className="pros-cons">
            <h2> Loadout 2 Stats</h2>
            <div>
              {getProsAndCons("loadout2").pros.length > 0 ? (
                getProsAndCons("loadout2").pros.map((pro, index) => (
                  <p key={index}>{pro}</p>
                ))
              ) : (
                <p>No stats to show</p>
              )}
            </div>
            <div>
              {getProsAndCons("loadout2").cons.map((con, index) => (
                <p key={index}>{con}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameGrid;
