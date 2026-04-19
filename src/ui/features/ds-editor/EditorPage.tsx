import DottedPattern from "@src/assets/dotted-pattern.svg?react";
import Header from "@src/ui/components/Header/Header";
import TypographyPanel from "@src/ui/components/TypographyPanel/TypographyPanel";
import styles from "./EditorPage.module.css";
styles;

function EditorPage() {
    const samplePaths = ["primitives", "typography"];
    return (
        <div>
            <DottedPattern
                style={{
                    position: "absolute",
                    zIndex: -1,
                    width: "100%",
                    height: "100%",
                }}
            />

            <Header />
            <section>
                <TypographyPanel />
            </section>
            {/* <Breadcrumb
                paths={samplePaths}
                onPathClick={(path) => console.log(path)}
            />
            <ComponentTree /> */}
        </div>
    );
}

export default EditorPage;
