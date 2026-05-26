export class SectionView {
    get_values(){
        let map_button = document.getElementById('map_button')
        let tutorial_button = document.getElementById('tutorial_button')
        let saved_list_button = document.getElementById('saved_list_button')
        let about_button = document.getElementById('about_button')
        let advanced_options_button = document.getElementById('advanced_options_button')
        return [map_button, tutorial_button, saved_list_button, about_button, advanced_options_button]
    }
}