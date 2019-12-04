<template>
    <div>
        <table class="table mt-4">
            <thead>
                <th width="100">購買時間</th>
                <th width="120">Email</th>
                <th>購買內容</th>
                <th width="120">應付金額</th>
                <th width="90">是否付款</th>
            </thead>
            <tbody>
                <tr v-for="(item) in order" :key="item.id">
                    <td> {{item.create_at | time}} </td>
                    <td> {{item.user.email}} </td>
                    <td> 
                        <ul class="list-unstyled">
                            <li v-for="(product, index) in item.products" :key="index">
                                {{ product.product.title }} 數量：{{ product.qty }}
                                {{ product.product.unit }}
                            </li>
                        </ul>
                    </td>
                    <td class="text-right"> {{item.total | currency}} </td>
                    <td>
                        <span v-if="item.is_paid" class="text-success">已付款</span>
                        <span v-else>未付款</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            order:[],
                
        }
    },
    methods: {
        getOrder(page = 1) {
            const api = `${process.env.VUE_APP_API}/api/erictest/admin/orders?page=${page}`;           
            this.$http.get(api).then((response) => {            
            console.log(response.data);
            this.order= response.data.orders;
            // console.log(this.order);                                
        })
        }
    },
    created() {
        this.getOrder();
    },
}
</script>