import { useState } from "react";
import data from "./data";

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [multiSelected, setMultiSelected] = useState([]);
    const [enableMultiselect, setEnableMultiSelect] = useState(false);

    const handleSingleSelect = (id) => {
        setSelected(id === selected ? null : id);
    };

    const handleMultiSelect = (id) => {
        const updatedSelections = multiSelected.includes(id)
            ? multiSelected.filter((item) => item !== id)
            : [...multiSelected, id];
        setMultiSelected(updatedSelections);
    };


    return (
        <div style={styles.wrapper}>
            <button onClick={() => setEnableMultiSelect(!enableMultiselect)}>
                {enableMultiselect ? "Disable Multi Select" : "Enable Multi Select"}
            </button>
            <div style={styles.accordion}>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((dataItems) => (
                        <div className="item" key={dataItems.id} style={styles.item}>
                            <div
                                className="title"
                                onClick={
                                    enableMultiselect
                                        ? () => handleMultiSelect(dataItems.id)
                                        : () => handleSingleSelect(dataItems.id)
                                }
                                style={styles.title}
                            >
                                <h3 style={styles.titleText}>{dataItems.title}</h3>
                                <span style={styles.plusSign}>
                                    {enableMultiselect
                                        ? multiSelected.includes(dataItems.id)
                                            ? "-"
                                            : "+"
                                        : selected === dataItems.id
                                            ? "-"
                                            : "+"}
                                </span>
                            </div>

                            {(selected === dataItems.id || multiSelected.includes(dataItems.id)) && (
                                <div style={styles.content}>
                                    <h6>{dataItems.content}</h6>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No Data</div>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
        backgroundColor: "yellow",
    },
    accordion: {
        width: "80%",
        maxWidth: "600px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    item: {
        marginBottom: "10px",
        borderBottom: "1px solid #ddd",
        paddingBottom: "10px",
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "18px",
        color: "#333",
    },
    titleText: {
        marginRight: "10px",
    },
    plusSign: {
        fontSize: "20px",
    },
    content: {
        marginTop: "10px",
        fontSize: "16px",
        color: "#666",
        marginLeft: "20px",
    },
};

export default Accordion;
