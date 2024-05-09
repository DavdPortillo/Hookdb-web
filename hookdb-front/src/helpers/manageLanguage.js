export const selectLanguageGuest = async () => {
    const languageCode = navigator.language;
    const language = languageCode.split('-')[0];
    let languageModule;
    try {
        if (language === 'es') {
            languageModule = await import('../languages/spanish.json');
        } else {
            languageModule = await import('../languages/english.json');
        }
    } catch (error) {
        console.error("Error loading language file:", error);
    }
    
    return languageModule.default;
}


export const selectLanguageUser = async (language) => {

    let languageModule;
    try {
        if (language === 'es') {
            languageModule = await import('../languages/spanish.json');
        } else {
            languageModule = await import('../languages/english.json');
        }
    } catch (error) {
        console.error("Error loading language file:", error);
    }
    
    return languageModule.default;
}

