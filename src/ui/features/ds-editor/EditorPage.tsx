import DottedPattern from "@src/assets/dotted-pattern.svg?react";
import { Tree, TreeItem } from "@src/ui/components/ReactAria/Tree/Tree";
import TypographyPanel from "@src/ui/components/TypographyPanel/TypographyPanel";
import styles from "./EditorPage.module.scss";
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

            {/* <Header /> */}
            <section>
                <Tree selectionMode="none" aria-label="Files">
                    <TreeItem title="Documents">
                        <TreeItem title="Project">
                            <TreeItem title="Weekly Report" />
                        </TreeItem>
                    </TreeItem>
                    <TreeItem title="Photos">
                        <TreeItem title="Image 1" />
                        <TreeItem title="Image 2" />
                    </TreeItem>
                </Tree>
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
