import { useEffect, useState } from "react";
import { Title } from "react-native-paper";
import Storage from "../models/Storage";

export default function Home() {
    const [value, setValue] = useState("");

    useEffect(() => {
        (async () => {
            await Storage.Instance.Init();
            await Storage.Instance.SetItem("test", "123");
            setValue((await Storage.Instance.GetItem("test")) || "");
        })();
    }, []);

    return (
        <>
            <Title style={{margin: 50}}>Value: {value}</Title>
        </>
    );
}