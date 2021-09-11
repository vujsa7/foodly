var editArticleDialogComponent = {
    data(){
      return{
        form:{
            articleName: '',
            oldName: '',
            articleDescription: '',
            articlePrice: undefined,
            articleType: '',
            articleQuantity: undefined,
            articleImage: undefined,
            backendImage: undefined
        },
        messageDialogData:{
            title: "",
            message: "",
            buttonText: ""
        },
        isEditArticleModalDisplayed: false
      }
    },
    props: [
      'article'
    ],
    components:{
      messageDialog: messageDialogComponent 
    },
    validations:{
      form:{
        articleName:{
          required: validators.required
        },
        articleDescription:{
          required : validators.required
        },
        articleType:{
          isSelected
        },
        articlePrice:{
          required : validators.required
        },
        articleQuantity:{
          required : validators.required
        }
      }
    },
    mounted(){
        this.form.articleName = this.article.name;
        this.form.oldName = this.article.name;
        this.form.articleDescription = this.article.description;
        this.form.articlePrice = this.article.price;
        this.form.articleType =  this.article.articleType;
        this.form.articleQuantity = this.article.quantity;
        this.form.articleImage = this.article.image;
    },
    methods: {
      submitForm(){
        if(!this.$v.form.$invalid){
            // if(this.form.backendImage == ""){
            //   this.form.backendImage = this.form.articleImage;
            // }
          var editedArticle = {
            restaurantId: this.article.restaurantId,
            oldName: this.form.oldName,
            name: this.form.articleName,
            price: this.form.articlePrice,
            articleType: this.form.articleType,
            quantity: this.form.articleQuantity,
            description: this.form.articleDescription,
            image: this.form.backendImage  
          } 
          let token = window.localStorage.getItem('token');
          axios
          .put("http://localhost:8081/rest/editArticle",JSON.stringify(editedArticle),{
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then(response => {
            this.closeDialog();
          })
          .catch(error => {
            if(error.response){
              this.showServerResponse(error);
            }
          });
        }
      },
      showServerResponse(error){
        if(error.response.status == "409"){
          this.messageDialogData.title = "Article name taken";
          this.messageDialogData.message = "Article with that name already exists, please try again.";
          this.messageDialogData.buttonText = "Try again";
          this.$refs.messageDialogChild.displayDialog();
        }  
      },
      displayEditArticleModal(){
        this.isEditArticleModalDisplayed = true;
        this.form.articleName = this.article.name;
        this.form.oldName = this.article.name;
        this.form.articleDescription = this.article.description;
        this.form.articlePrice = this.article.price;
        this.form.articleType =  this.article.articleType;
        this.form.articleQuantity = this.article.quantity;
        this.form.articleImage = this.article.image;
      },
      closeDialog(){
        this.isEditArticleModalDisplayed = false;
        this.$parent.reloadRestaurant();
      },
      imageAdded(e){
        const file = e.target.files[0];
        if(file && (file.type == "image/jpeg" || file.type == "image/jpg")){
         this.createBase64Image(file);
         this.form.articleImage=URL.createObjectURL(file);
        }  
      },
      createBase64Image(file){
          const reader= new FileReader();
          reader.onload = (e) =>{
            this.form.backendImage = e.target.result;   
          }
          reader.readAsDataURL(file);
      },
      buttonClicked(){
        document.getElementById(this.article.name).click();
      }
    },
    template: `
    <div class="modal" :class="{ 'display-block' : isEditArticleModalDisplayed }">
      <div class="modal-content">
        <div class="modal-header d-flex flex-column">
          <div class="d-flex flex-row align-items-center">
            <span class="align-self-center">Edit article</span>
            <span class="close" @click="closeDialog">&times;</span>
          </div>
        </div>
        <div class="modal-body">
          <form action="http://localhost:8081/rest/editArticle" method="put" @submit.prevent="submitForm()" autocomplete="off">
            <div class="d-flex row">
              <div class="d-flex left justify-end custom-file">
                <button type="button" class="btn btn-light shadow-none add-article-button" @click="buttonClicked()">
                  <img v-if="this.form.articleImage" :src="this.form.articleImage" class= "add-article-image" alt = "Profile Image">
                  <img v-if="!this.form.articleImage && this.article.image" :src="article.image" alt = "Add Image">
                </button>
                <input type="file" hidden @change="imageAdded" v-bind:id="article.name"/>
              </div>          
              <div class="d-flex right justify-end">
                <div class="mb-1">
                  <label class="form-control-label">Article Name</label>
                  <input v-model="form.articleName" @blur="$v.form.articleName.$touch()" type="text" :class="{'field-invalid': $v.form.articleName.$dirty, 'field-valid': (!$v.form.articleName.$invalid && form.name != '')}" class="form-control"/>
                  <div v-if="$v.form.articleName.$dirty">
                      <span class="error-message" v-if="$v.form.articleName.$invalid">Article name is required!</span>
                  </div>
                </div>
              </div>
              <div class="mb-1">
                    <label class="form-control-label">Description</label>
                    <textarea v-model="form.articleDescription" @blur="$v.form.articleDescription.$touch()" type="text" :class="{'field-invalid': $v.form.articleDescription.$dirty, 'field-valid': (!$v.form.articleDescription.$invalid && form.articleDescription != '')}" class="form-control article-description-height text-wrap"></textarea>
                    <div v-if="$v.form.articleDescription.$dirty">
                      <span class="error-message" v-if="$v.form.articleDescription.$invalid">Description is required.</span>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="mb-3 me-2">
                        <label class="form-control-label ">Price</label>
                        <input v-model="form.articlePrice" @blur="$v.form.articlePrice.$touch()" type="number" min="0" step=".01" placeholder="$" :class="{'field-invalid': $v.form.articlePrice.$dirty, 'field-valid': (!$v.form.articlePrice.$invalid && form.articlePrice != '')}" class="form-control article-price" />
                        <div v-if="$v.form.articlePrice.$dirty">
                          <span class="error-message" v-if="$v.form.articlePrice.$invalid">Price of article is required.</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-control-label ">Quantity(g/ml)</label>
                        <input v-model="form.articleQuantity" @blur="$v.form.articleQuantity.$touch()" type="number" min="0" placeholder="$" :class="{'field-invalid': $v.form.articleQuantity.$dirty, 'field-valid': (!$v.form.articleQuantity.$invalid && form.articleQuantity != '')}" class="form-control article-quantity" />
                        <div v-if="$v.form.articleQuantity.$dirty">
                          <span class="error-message" v-if="$v.form.articleQuantity.$invalid">Quantity of article is required.</span>
                        </div>
                    </div>
                    <div class="mb-3 ms-2">
                      <label class="form-control-label">Article type</label>
                      <select @blur="$v.form.articleType.$touch()" v-model="form.articleType" :class="{'field-invalid': $v.form.articleType.$dirty, 'field-valid': (!$v.form.articleType.$invalid && form.articleType != '')}" class="form-select">
                        <option value="" disabled selected>Select type...</option>
                        <option value="meal">Meal</option>
                        <option value="drink">Drink</option>
                      </select>
                      <div v-if="$v.form.articleType.$dirty">
                        <span class="error-message" v-if="$v.form.articleType.$invalid">Type is required.</span>
                      </div>
                    </div>
                  </div>
                  <button  type="submit" class="btn btn-danger regular-button edit-article-button">Edit article</button>
            </div>
          </form>
        </div>
      </div>
      <message-dialog ref="messageDialogChild" :message="messageDialogData"></message-dialog>
    </div>
    `
  }