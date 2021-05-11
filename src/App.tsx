import React, {useState} from 'react';
import './App.css';
import {ComponentURLElem, Loading} from "./Models";
import {ComponentURL} from "./ComponentURL";
import {Map} from "immutable";
import {LinearProgress} from "@material-ui/core";

function App() {
    const [componentDict, setComponentDict] = useState<Map<string, ComponentURLElem>>(Map({1: null, 2: null, 3: null, 4: null, 5: null}))

    const setURL = (key: string) => (url: string) => {
        setComponentDict(prevState => prevState.set(key, {url, loading: "wait"}))
    }

    const setLoadStatus = (key: string) => (status: Loading) =>
        setComponentDict(prevState => prevState.updateIn([key, "loading"], () => status))

    const globalLoad = componentDict.find((elem: ComponentURLElem) => elem ? elem.loading === "loading" : false);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Тестовый проект
                </p>
            </header>
            {globalLoad && <LinearProgress color="primary" />}
            <div>
                {componentDict.map((v: ComponentURLElem, k: string) =>
                    <ComponentURL key={k} componentKey={k} componentData={v} setURL={setURL(k)} setLoading={setLoadStatus(k)} />
                ).valueSeq()}
            </div>
        </div>
    );
}

export default App;
