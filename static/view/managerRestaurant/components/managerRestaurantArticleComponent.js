var managerRestaurantArticleItemComponent = {
    data(){
      return{
        numberOfItems: 1,
        isSvgAnimationActive : false
      }
    },
    props:[
        'article'
    ],
    components:{
        messageDialog: messageDialogComponent,
        editArticleDialog: editArticleDialogComponent
    },
    methods:{
        editArticle(){
            this.$refs.editArticleChild.displayEditArticleModal();
        },
        reloadRestaurant(){
            this.$parent.reloadRestaurant();
        }
    },
    template:
    `
    <div>
        <edit-article-dialog ref="editArticleChild" :article="article"></edit-article-dialog>
        <div class="card-img-top-container">
            <img class="card-img-top img-fluid" :src="article.image" alt="Article image">
        </div>
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5 class="card-title fw-bold mt-3">{{article.name}}</h5>
                <button type="button" style="background:white" class="btn btn-light shadow-none" @click="editArticle()">
                    <img src="../assets/icons/edit16px.png"/>
                    <span>Edit</span>
                </button>
            </div>
            <p class="card-text">{{article.description}}</p>
            <span class="manager-article-price">Price {{article.price}}$</span>
        </div>
    </div>
    `
}