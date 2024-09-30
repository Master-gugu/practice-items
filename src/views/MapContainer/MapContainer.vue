<template>
    <div class="MapContainer">
        <div id="container"></div>
        <div class="MapContainer_search">
            <el-select
                v-model="searchValue"
                filterable
                remote
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                @change="change"
                :loading="loading">
                <el-option
                    v-for="item in searchOptions"
                    :key="item.id"
                    :label="item.value"
                    :value="item">
                </el-option>
            </el-select>

            <el-input id="tipinput" v-model="searchInput" @input="chuangeinput" placeholder="请输入内容"></el-input>
        </div>
        
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
    data () {
        return {
            map: null,
            amap: null,
            lnglat: [],
            searchInput: '',
            searchValue: '',
            searchOptions: [],
            loading: false,
        }
    },
    mounted() {
        this.initAmap();
    },
    methods: {
        chuangeinput(value) {
            console.log('输入内容', value)
            this.amap.plugin('AMap.AutoComplete', () => {
                var auto = new this.amap.AutoComplete({ city: '全国', input: 'tipinput' });
                auto.search(value, (status, result) => {
                    console.log('输入关键词搜索结果', result)
                });
            });
        },
        // 远程搜索方法
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    console.log('输入内容', query, this.map, this.amap)
                    // 创建输入提示插件
                    this.amap.plugin('AMap.AutoComplete', () => {
                        var auto = new this.amap.AutoComplete({ city: '全国' });
                        auto.search(query, (status, result) => {
                            console.log('输入关键词搜索结果', result)
                            let tipsArr = result?.tips.map(item => {
                                item.value = item.name;
                                item.label = item.name;
                                return item;
                            });
                            this.searchOptions = tipsArr;
                        });
                    });
                }, 200);
            } else {
                this.searchOptions = [];
            }
        },
        // 下拉选中值
        change(obj) {
            console.log('下拉选中值', obj);

            let lng = obj.location.lng
            let lat = obj.location.lat
            // 设置地图中心点
            this.map.setCenter([lng, lat]);

            let marker = new this.amap.Marker({
                position: [lng, lat],
                title: obj.name
            });
            marker.on('click', (e) => {
                let posi = e.target._position;
                let url = 'https://uri.amap.com/marker?position=' + posi[0] + ',' + posi[1]
                window.open(url, '_blank')
                // https://uri.amap.com/marker?position=116.473195,39.993253
                // this.map.remove(marker)
            });
            this.map.add(marker);

            // this.amap.plugin('AMap.PlaceSearch', () => {
            //     let ps = new this.amap.PlaceSearch({
            //         city: obj.adcode,
            //         map: this.map
            //     })
            //     ps.getDetails(obj.id, (status, result) => {
            //         console.log('输入id查看详情', result)
            //     })
            //     // ps.search(obj.name, (status, result) => {
            //     //     console.log('输入关键词搜索结果', result)
            //     // });
            // })
        },
        initAmap() {
            console.log('触发', window._AMapSecurityConfig)
            window._AMapSecurityConfig = {
                securityJsCode: 'f1dcd6110575c47bea44adae1ab9ed91'
            };
            AMapLoader.load({
                key: 'f7d58e636f276d1382aa97f36127fdcc',
                version: '2.0',  // 2.0 JSAPI 的版本, 会受mockjs的影响
                plugins: ['Amap.Scale',"AMap.Marker", "AMap.InfoWindow", "AMap.PlaceSearch", "AMap.AutoComplete"],
            }).then((AMap) => {
                console.log('高德地图', AMap)
                this.amap = AMap;
                this.map = new AMap.Map('container', {
                    viewMode: "2D", 
                    zoom: 15,
                    center: [114.292971,30.58393],
                    resizeEnable: true
                });


                // 创建一个Marker实例
                var marker = new AMap.Marker({
                    position: [114.292971,30.58393],
                    // icon: new AMap.Icon({
                    //     size: new AMap.Size(20, 32), // 图标大小
                    //     image: "//a.amap.com/jsapi_demos/static/resource/img/marker-icon.png", // 图标地址
                    //     imageSize: new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
                    // }),
                    title: '武汉美术馆'
                });

                //将点标记添加至地图
                this.map.add(marker);

                //将该点标记删除
                // this.map.remove(marker);

                //删除多个点标记
                // this.map.remove(markerList);



                // 创建labelMarker
                var labelMarker = new AMap.LabelMarker({
                    name: '标注1', // 此属性并不会绘制在地图上，只是作为该点的id使用
                    position: [114.295009,30.581157],
                    opacity: 1, // 标注层透明度
                    icon: {
                        type: 'image', // 图标类型，现阶段只支持 image 类型
                        image: '//vdata.amap.com/icons/b18/1/2.png', // 图片 url
                        size: [30, 30],	// 图片尺寸
                        anchor: 'center',
                    },
                    text: {
                        content: 'labelMarker', // 要展示的文字内容
                        direction: 'right', // 文字方向 
                        offset: [0, 0], // 文字偏移量 在direction基础上的偏移量
                        style: {
                            fontSize: 30, // 字体大小
                            fillColor: '#22886f', // 字体颜色
                            strokeWidth: 2, // 描边宽度
                        }
                    }
                })

                
                this.map.add(labelMarker);


                // 创建信息窗体
                var content = [
                    "<div><b>高德软件有限公司</b>",
                    "电话 : 010-84107000   邮编 : 100102",
                    "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div>",
                ]
                var infoWindow = new AMap.InfoWindow({
                    content: content.join("<br>"), // 传入字符串拼接的dom元素
                    anchor: "top-left",
                })

                infoWindow.open(this.map, this.map.getCenter()); //map 为当前地图的实例，map.getCenter() 用于获取地图中心点坐标


                // 监听鼠标移入事件
                marker.on('mouseover', (e) => {
                    infoWindow.open(this.map, e.lnglat); //后面的参数指的是经纬度，在此显示窗口
                });
                marker.on('mouseout', () => {
                    infoWindow.close();
                });

                this.map.on('click', (e) => {
                    console.log('监听点击', e)
                    this.fetchlnglat(e.lnglat)
                })

                // this.createPlaceSearch()


            }).catch((e) => {
                console.log('高德地图异常', e)
            });


            
        },
        fetchlnglat(lnglat) {
            console.log('获取经纬度', lnglat)

            let arrlnglat = [lnglat.lng, lnglat.lat];
            var marker = new this.amap.Marker({
                position: arrlnglat,
                title: '武汉美术馆'
            });

            let flag = true;

            marker.on('click', (e) => {
                console.log('监听点击标点', e)
                let posi = e.target._position;
                console.log('获取经纬度', posi)
                this.lnglat.forEach((item) => {
                    if(item[0] == posi[0] && item[1] == posi[1]) {
                        this.map.remove(marker);
                        flag = false;
                    }
                })
            })

            if(flag) {
                //将点标记添加至地图
                this.map.add(marker);
                this.lnglat.push(arrlnglat);
            }
        },
        createPlaceSearch() {
            console.log('是否获取到AMap', this.amap)
            this.amap.plugin('AMap.PlaceSearch', () => {
                let placeSearch = new this.amap.PlaceSearch({
                    map: this.map, // 关联上地图
                    city: '南昌', // 指定城市
                    // city: this.searchValue,
                    type: '', // 数据类别
                    pageSize: 10, // 每页结果数，默认10
                    pageIndex: 1, // 请求页码，默认1
                    extensions: 'base' // 返回信息详略，默认为base（基本信息）
                })
                placeSearch.search('公园', (status, result) => {
                    console.log('搜索结果', result)
                })

            })
        }

    }
}
</script>

<style lang="scss" scoped>
.MapContainer {
    #container{
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 800px;
    }
    .MapContainer_search {
        position: fixed;
        top: 50px;
        right: 50px;
    }
}
</style>