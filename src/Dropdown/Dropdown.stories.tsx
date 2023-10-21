import React from "react";
import Dropdown from "./Dropdown";

export default {
    title: "TestComponent"
};

export const WithText = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            toggle={<button onClick={() => setIsOpen(true)}>"Click me!"</button>}
            children={
                <><h2>Made with love by Harvey</h2>
                    <h2>Made with love by Harvey</h2>
                    <h2>Made with love by Harvey</h2>
                    <h2>Made with love by Harvey</h2></>
            }
        />
    )
};

export const WithButtons = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            toggle={<button onClick={() => setIsOpen(true)}>"Click Me!"</button>}
            children={
                <div>
                    <button onClick={() => global.alert("You clicked option 1!")}>I'm an option</button>
                    <button onClick={() => global.alert("You clicked option 2!")}>I'm an option</button>
                    <button onClick={() => global.alert("You clicked option 3!")}>I'm an option</button>
                    <button onClick={() => global.alert("You clicked option 4!")}>I'm an option</button>
                    <button onClick={() => global.alert("You clicked option 5!")}>I'm an option</button>
                </div>
            }
        />
    )
};
