<template>
    <div>
        <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
        </div>
        <div class="text-right">
            <button class="btn btn-primary mt-3" @click="opencouponModal(true)" >建立新的優惠券</button>
        </div>
        <table class="table mt-4">
            <thead>
                <th width="120">名稱</th>
                <th>折扣百分比</th>
                <th width="120">到期日</th>
                <th width="90">是否啟用</th>
                <th width="120">編輯</th>
            </thead>
            <tbody>
                <tr v-for="(item, key) in coupon" :key="key">
                    <td> {{item.title}} </td>
                    <td> {{item.percent}} </td>
                    <td> {{`${new Date(item.due_date*1000).getFullYear()}/${new Date(item.due_date*1000).getMonth()+1}/${new Date(item.due_date*1000).getDate()}`}} </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="opencouponModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="deleteCoupon(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Modal -->
        <div class="modal" tabindex="-1" role="dialog" id="couponModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">新增優惠券</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="title">標題</label>
                        <input
                            type="text"
                            v-model="tempcoupon.title"
                            class="form-control"
                            id="title"
                            placeholder="請輸入標題"
                        />
                        <label for="title">優惠碼</label>
                        <input
                            type="text"
                            v-model="tempcoupon.code"
                            class="form-control"
                            id="title"
                            placeholder="code"
                        />
                        <label for="title">到期日</label>
                        <input
                            type="date"
                            v-model="tempcoupon.due_date"
                            class="form-control"
                            id="title"
                            placeholder="date"
                        />
                        <label for="title">折扣百分比</label>
                        <input
                            type="number"
                            v-model="tempcoupon.percent"
                            class="form-control"
                            id="title"
                            placeholder=""
                        />
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input
                            class="form-check-input"
                            v-model="tempcoupon.is_enabled"
                            :true-value="1"
                            :false-value="0"
                            type="checkbox"
                            id="is_enabled"
                            />
                            <label class="form-check-label" for="is_enabled">是否啟用</label>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="editCoupon">確認</button>
                </div>
                </div>
            </div>
        </div>
        <!-- End -->
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
            isLoading: false,
            coupon: [],
            tempcoupon: {},
            isNew: false,
        }
    },
    methods: {
        opencouponModal(isNew, item) {
            $('#couponModal').modal('show');
            if (isNew) {
                this.tempcoupon = {};
                this.isNew = true;
            } else {
                this.tempcoupon = Object.assign( {} ,item);
                this.isNew = false;
            }
        },
        editCoupon() {
            let timestamp =new Date(this.tempcoupon.due_date);
            timestamp = Math.floor(timestamp / 1000);
            this.tempcoupon.due_date = timestamp;
            let api = `${process.env.VUE_APP_API}/api/erictest/admin/coupon`;
            let httpMethod= 'post'
            this.isLoading = true;
            if (!this.isNew) {
                api = `${process.env.VUE_APP_API}/api/erictest/admin/coupon/${this.tempcoupon.id}`
                httpMethod = 'put'
            }
            this.$http[httpMethod](api , { data: this.tempcoupon }).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    $('#couponModal').modal('hide');
                    this.getCoupon();
                } else {
                    $('#couponModal').modal('hide');
                    this.getCoupon();
                    alert('新增失敗')
                }
                this.isLoading = false;               
            })
        },
        getCoupon(page = 1) {
            const api = `${process.env.VUE_APP_API}/api/erictest/admin/coupons?page={page}`;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                this.coupon = response.data.coupons;
                this.isLoading = false;  
                $('#couponModal').modal('hide');             
            })
        },
        deleteCoupon(item){
            this.coupon = item ;
            const api = `${process.env.VUE_APP_API}/api/erictest/admin/coupon/${this.coupon.id}`;
            this.isLoading = true;
            this.$http.delete(api).then((response) => {
                console.log(response.data);
                this.getCoupon();
                this.isLoading = false;  
                $('#couponModal').modal('hide');             
            })
        }
    },
    created() {
        this.getCoupon();
    },
}
</script>