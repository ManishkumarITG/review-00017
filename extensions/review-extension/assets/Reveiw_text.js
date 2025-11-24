async function getReaviewTextExeData() {
    try {
        const res = await fetch("");
        const data = res.json();
    } catch (error) {
        console.log("getReaviewTextExeData" , error);
    }
}