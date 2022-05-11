
const api_url = `https://api.typen-vocabulary.com`

export default class APIService{
    /**
     * 単語の意味取得
     * @param {object} page_data title(string), body(text), and attached tags(int list).
     * @returns response.json includes data of inserted page record.
     */
    static async fetchEnglishDefinition(word: String){
        try {
            const response = await fetch(`${api_url}/words/${word}/definitions/en`, {
                method: 'GET',
                mode: 'cors'
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };
}