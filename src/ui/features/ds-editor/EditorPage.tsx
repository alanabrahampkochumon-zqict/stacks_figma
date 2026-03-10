import DottedPattern from "@src/assets/dotted-pattern.svg?react";
import Header from "@src/ui/components/Header/Header";
import styles from "./EditorPage.module.css";
styles;

function EditorPage() {
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
        </div>
    );
}

export default EditorPage;
