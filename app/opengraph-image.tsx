import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Creative Agency | Innovative Digital Solutions";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: "linear-gradient(to bottom right, #000000, #1a1a1a)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontFamily: "sans-serif",
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    {/* Simple Logo Shape */}
                    <div
                        style={{
                            width: "100px",
                            height: "100px",
                            background: "white",
                            borderRadius: "50%",
                            marginRight: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                background: "black",
                                borderRadius: "50%",
                            }}
                        />
                    </div>
                    <span style={{ fontWeight: "bold" }}>Creative Agency</span>
                </div>
                <div
                    style={{
                        fontSize: 48,
                        marginTop: 20,
                        background: "linear-gradient(to right, #a1a1aa, #ffffff)",
                        backgroundClip: "text",
                        color: "transparent",
                        maxWidth: "80%",
                    }}
                >
                    Innovative Digital Solutions
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
