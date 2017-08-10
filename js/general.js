$(document).ready(function () {
    (function () {
        var apiURL = 'https://imfishhead.backme.tw/api/projects/583.json?token=c4b1d4facab67eeaa6ceecf443fc6c0c';

        $.getJSON(apiURL, function (data) {
            pageInitialize(data);
            flexBoxAdjust();
            lightBox();
        });

        function pageInitialize(data) {
            // project info and process bar
            var project_title = data.title,
                project_money_goal = Math.round(data.money_goal),
                project_money_pledged = Math.round(data.money_pledged),
                project_backer_count = Math.round(data.backer_count);

            var $projectInfo_description = $('.projectInfo_description'),
                $projectInfo_money_pledged = $('.projectInfo_money_pledged'),
                $projectInfo_backer_count = $('.projectInfo_backer_count');
                $progressBar = $('.progressBar');

                // project info
            $projectInfo_description.text(project_title);
            $projectInfo_money_pledged.text(project_money_pledged);
            $projectInfo_backer_count.text(project_backer_count);

                // process bar
            var processPercentage = (project_money_pledged / project_money_goal) * 100;
            $progressBar.css({
                width: processPercentage + '%'
            });
            // project info and process bar End

            // product reward
            var productReward = data.rewards;

            var $productReward_list = $('.productReward_list'),
                $productReward_amount = $('.productReward_amount');

            $productReward_amount.text(productReward.length);

                // generate box for product reward list
            for (let i = 0; i < productReward.length; i++) {
                $productReward_list.append('<div class="productReward_list_box"><div class="productReward_list_box_section1"><p class="productReward_priceLabel">NT$&nbsp;<span class="productReward_priceLabel_price"></span></p><div class="productReward_productImgBox"><img class="productReward_productImg" src="img/product.png" alt="商品圖片"></div></div><div class="productReward_list_box_section2"><p class="productReward_productName">經典錶帶</p><p class="productReward_productDescription">上光場</p><div class="productReward_btn"><div class="btn btn_more lightBox_trigger">閱讀更多</div><a href="#" class="btn btn_buyNow" target="_blank">直接購買</a></div></div></div>'
                );
            }
                // data input
            var $productReward_list_box = $('.productReward_list_box');
            for (let i = 0; i < $productReward_list_box.length; i++) {
                var buyNow_url = 'https://imfishhead.backme.tw/cashflow/checkout?project_id=' + data.id + '&reward_id=' + productReward[i].id;

                var productReward_priceLabel_price = $productReward_list_box[i].getElementsByClassName('productReward_priceLabel_price'),
                    productReward_productImg = $productReward_list_box[i].getElementsByClassName('productReward_productImg'),
                    productReward_productName = $productReward_list_box[i].getElementsByClassName('productReward_productName'),
                    productReward_productDescription = $productReward_list_box[i].getElementsByClassName('productReward_productDescription');
                    btn_buyNow = $productReward_list_box[i].getElementsByClassName('btn_buyNow');

                productReward_priceLabel_price[0].textContent = productReward[i].price;
                productReward_productImg[0].setAttribute('src', productReward[i].avatar.url);
                productReward_productName[0].textContent = productReward[i].title;
                productReward_productDescription[0].textContent = removeHTMLTag(productReward[i].description);
                btn_buyNow[0].setAttribute('href', buyNow_url);
            }
            // product reward End
        }

        function lightBox() {
            var $lightBox_trigger = $('.lightBox_trigger'),
                $lightBox_close = $('.lightBox_btn_close'),
                $lightBox = $('.lightBox');

            $lightBox_trigger.click(function () {
                $lightBox.fadeIn(200);

                var $productReward_list_box = $(this).closest('.productReward_list_box'),
                    $productReward_priceLabel_price = $productReward_list_box.find('.productReward_priceLabel_price'),
                    $productReward_productName = $productReward_list_box.find('.productReward_productName'),
                    $productReward_productDescription = $productReward_list_box.find('.productReward_productDescription');
                    $btn_buyNow = $productReward_list_box.find('.btn_buyNow'),
                    $productReward_productImg = $productReward_list_box.find('.productReward_productImg');

                var price = $productReward_priceLabel_price.text(),
                    title = $productReward_productName.text(),
                    description = $productReward_productDescription.text(),
                    buyUrl = $btn_buyNow.attr('href'),
                    imgURL = $productReward_productImg.attr('src');

                var $lightBox_priceLabel_price = $('.lightBox_priceLabel_price'),
                    $lightBox_productName = $('.lightBox_productName'),
                    $lightBox_productDescription = $('.lightBox_productDescription'),
                    $lightBox_btn_buyNow = $('.lightBox .btn_buyNow'),
                    $lightBox_img = $('.lightBox_img');

                $lightBox_priceLabel_price.text(price);
                $lightBox_productName.text(title);
                $lightBox_productDescription.text(description);
                $lightBox_btn_buyNow.attr('href', buyUrl);
                $lightBox_img.attr('src', imgURL);
            });

            $lightBox_close.click(function () {
                $lightBox.fadeOut(100);
            });

            // press "esc" to close lightbox
            $(document).keyup(function(e) {
                if (e.keyCode === 27) {
                    $lightBox.fadeOut(100);
                }
            });
        }

        // adjust align to last line of flex box
        function flexBoxAdjust() {
            var $productReward_list = $('.productReward_list'),
                $productReward_list_box = $('.productReward_list_box'),
                $window = $(window);

            items_amount = $productReward_list_box.length;

            flexBoxAdjust_exe();

            $window.resize(flexBoxAdjust_exe);

            function flexBoxAdjust_exe() {
                var windowWidth_withScrollBar = window.outerWidth,
                    boxWidth_inner = $productReward_list.width(),
                    itemWidth_outer = $productReward_list_box.outerWidth(true);

                var $flexBoxAdjust_fakeBox = $('.flexBoxAdjust_fakeBox');

                if (windowWidth_withScrollBar >= 768) {

                    $flexBoxAdjust_fakeBox.remove();

                    itemsInOneLine_amount = Math.floor(boxWidth_inner / itemWidth_outer);

                    var remainder = items_amount % itemsInOneLine_amount;
                    var supplement = itemsInOneLine_amount - remainder;

                    for (let i = 0; i < supplement; i++) {
                        $productReward_list.append('<div class="productReward_list_box flexBoxAdjust_fakeBox"></div>');
                    }
                } else {
                    $flexBoxAdjust_fakeBox.remove();
                }
            }
        }

        // source: http://www.cnblogs.com/liszt/archive/2011/08/16/2140007.html
        function removeHTMLTag(str) {
            str = str.replace(/<\/?[^>]*>/g,''); // remove HTML tag
            str = str.replace(/[ | ]*\n/g,'\n'); // remove space (end of line)
            str = str.replace(/\n[\s| | ]*\r/g,'\n'); // remove blank line
            str= str.replace(/&nbsp;/ig,''); // remove &nbsp;
            str= str.replace(/&hellip;/ig,''); // remove &hellip;
            return str;
        }
    })();
});
