$(document).ready(function () {

    (function () {
        var apiURL = 'https://imfishhead.backme.tw/api/projects/583.json?token=c4b1d4facab67eeaa6ceecf443fc6c0c';

        $.getJSON(apiURL, function (data) {
            pageInitialize(data);
            lightBox();
        });

        function pageInitialize(data) {
            // project info and process bar
            var project_title = data.title,
                project_money_goal = Math.round(data.money_goal),
                project_money_pledged = Math.round(data.money_pledged),
                project_backer_count = Math.round(data.backer_count);

            var $projectInfo_description = $('.projectInfo_description'),
                $projectInfo_money_goal = $('.projectInfo_money_goal'),
                $projectInfo_backer_count = $('.projectInfo_backer_count');
                $progressBar = $('.progressBar');

                // project info
            $projectInfo_description.text(project_title);
            $projectInfo_money_goal.text(project_money_pledged);
            $projectInfo_backer_count.text(project_backer_count);

                // process bar
            var processPercentage = (project_money_pledged / project_money_goal) * 100;
            $progressBar.css({
                width: processPercentage + '%'
            });
            // project info and process bar End

            // product reward
            var productReward = data.rewards;
            var $productReward_list = $('.productReward_list');

                // generate box for product reward list
            for (let i = 0; i < productReward.length; i++) {
                $productReward_list.append('<div class="productReward_list_box"><div class="productReward_list_box_section1"><p class="productReward_priceLabel">NT$&nbsp;<span>3990</span></p><img class="productReward_productImg" src="img/product.png" alt="商品圖片"></div><div class="productReward_list_box_section2"><p class="productReward_productName">經典錶帶</p><p class="productReward_productDescription">上光場上光場上光場上光場上光場上光場上光場上光場上光場上光場</p><div class="productReward_btn"><div class="btn btn_more lightBox_trigger">閱讀更多</div><div class="btn btn_buyNow">直接購買</div></div></div></div>'
                );
            }

        }

        function lightBox() {
            var $lightBox_trigger = $('.lightBox_trigger'),
            $lightBox_close = $('.lightBox_btn_close'),
            $lightBox = $('.lightBox');

            $lightBox_trigger.click(function () {
                $lightBox.fadeIn(200);
            });

            $lightBox_close.click(function () {
                $lightBox.fadeOut(100);
            });
        }

    })();

});
