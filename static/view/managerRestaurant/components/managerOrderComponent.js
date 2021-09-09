let managerOrderComponent = {
    data(){
        return{
            //date: this.order.dateOfOrder.match(/[^,]+,[^,]+/g)
        }
    },
    props:[
        'order'
    ],
    methods:{
        markForDelivery(id){
            axios
            .put("http://localhost:8081/rest/markForDelivery/" + id)
            .then(response => {
                this.reloadOrders();
            })
            .catch(error => {
                
            })
        },
        setInPreparation(id){
            axios
            .put("http://localhost:8081/rest/setInPreparation/" + id)
            .then(response => {
                this.reloadOrders();
            })
            .catch(error => {
                
            })
        },
        reloadOrders(){
            this.$parent.reloadOrders();
        }
    },
    template:
    `
    <div class="order-cards-container" v-if="order">
        <div class="order-card box-shadow">
            <div class="d-flex order-one flex-column justify-content-center">
                <span class="basic-title mb-1">
                    Restaurant
                </span>
                <span class="me-2">{{order.restaurantName}}</span>
            </div>
            <div class="d-flex order-two flex-column justify-content-center">
                <span class="basic-title mb-1">
                    Order no.
                </span>
                <div class="d-flex flex-row">
                    <span class="me-2">{{order.id}}</span>
                    <a v-if="order.orderStatus == 'inPreparation'" class="blue-link" v-on:click="markForDelivery(order.id)">Mark for delivery</a>
                    <a v-if="order.orderStatus == 'processing'" class="blue-link" v-on:click="setInPreparation(order.id)">In preparation</a>
                </div>
            </div>
            <div class="d-flex order-three flex-row align-items-center">
                <div class="d-flex me-3 order-details-red-container justify-content-center align-items-center">
                    <img v-if="order.orderStatus == 'delivered'" src="../assets/icons/delivered.png" class="order-details-img">
                    <img v-if="order.orderStatus == 'processing'" src="../assets/icons/processing.png" class="order-details-img">
                    <img v-if="order.orderStatus == 'inPreparation'" src="../assets/icons/inpreparation.png" class="order-details-img">
                    <img v-if="order.orderStatus == 'awaitingDelivery'" src="../assets/icons/awaitingdelivery.png" class="order-details-img">
                    <img v-if="order.orderStatus == 'shipping'" src="../assets/icons/shipping.png" class="order-details-img">
                    <img v-if="order.orderStatus == 'canceled'" src="../assets/icons/canceled.png" class="order-details-img">
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <span class="basic-title mb-1">
                        Status
                    </span>
                    <span v-if="order.orderStatus=='delivered'">Delivered</span>
                    <span v-if="order.orderStatus=='processing'">Processing</span>
                    <span v-if="order.orderStatus=='inPreparation'">In preparation</span>
                    <span v-if="order.orderStatus=='awaitingDelivery'">Awaiting delivery</span>
                    <span v-if="order.orderStatus=='shipping'">Shipping</span>
                    <span v-if="order.orderStatus=='canceled'">Canceled</span>
                </div>
            </div>
        
            <div class="d-flex order-four flex-column justify-content-center">
                <span class="basic-title mb-1">
                    Cuisine
                </span>
                <div class="d-flex flex-row">
                    <span class="me-2">{{order.restaurantType.charAt(0).toUpperCase() + order.restaurantType.substring(1)}}</span>
                </div>
            </div>
            <div class="d-flex order-five flex-column justify-content-center">
                <span class="basic-title mb-1">
                    Price
                </span>
                <span>&#36;{{parseFloat(order.price).toFixed(2)}}</span>
            </div>
            <div class="d-flex order-six flex-column justify-content-center">
            <span class="basic-title mb-1">
                Date
            </span>
            <span>{{order.dateOfOrder.match(/[^,]+,[^,]+/g)[0]}}</span>
            </div>
        </div>
    </div>
    `
}