interface dictionaryInterface {
    [key: string]: string[];
}

const dictionary:dictionaryInterface = {
    bi: ["bivalve", "bimonthly", "bicycle", "bifocal", "bilingual", "billion", "biannual", "bicentennial", "biped", "bisexual"],
    pedal: ["pedestrian", "pedal", "pedestal", "pedicure", "biped"],
    omni: ["omnivore","omnibus", "omnidirectional", "omnipotent", "omnipresent", "omniscient"],
    ling: ["linguist", "monolingual", "bilingual", "trilingual", "linguistic"],
    tox: ["detoxification", "toxic", "toxify", "toxicology", "intoxicated", "detox"],
    terr: ["terrestrial", "extraterrestrial", "terra", "terraform", "terrarium", "territory", "terrain"],
    chron: ["chronic", "chronicle", "chronograph", "chronological", "chronicler"],
};

export default dictionary;