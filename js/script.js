/* Descrizione:
*
*    Attraverso una chiamata ajax all’API di boolean
*    https://flynn.boolean.careers/exercises/api/array/music
*    avremo a disposizione una decina di dischi musicali.
*    Utilizzando vue, stampiamo a schermo una card per ogni album.
*    BONUS: Creare una select con tutti i generi dei dischi. 
            In base a cosa scegliamo nella select, vedremo i corrispondenti cd.
*    BONUS 2: Ordinare i dischi per anno di uscita. 
*/

let app = new Vue({
    el: '#root',
    data:{
        discs: [],
        discsFiltered: [],
        genres: ["All"],
        filters: [],
    },
    methods: {
        getListDisc(){

            axios.get("https://flynn.boolean.careers/exercises/api/array/music")
            .then( (response)=>{
                this.discs = response.data.response;
                
                this.discs.sort( (disc, disc2)=>{
                    return disc.year - disc2.year;
                }); 
                this.discsFiltered = this.discs;

                 this.getGenres();
            });        
        },
        getGenres(){
            this.discs.forEach(element => {
            
                if( !this.genres.includes(element.genre) ){
                    this.genres.push(element.genre);
                }
            });
    
        },
        getFilters(filters){
            this.discsFiltered = this.discs.filter(element => {
                return filters.includes(element.genre) || filters.includes("All"); 
            });
        },
  
        
    },
    created(){
        this.getListDisc();
    },
   
});


