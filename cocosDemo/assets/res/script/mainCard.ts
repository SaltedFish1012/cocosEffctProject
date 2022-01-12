
/**
 *  2022年1月10日
 *  @author zyh
 *  @param 卡片切换效果[摸牌,]
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class mainCard extends cc.Component {

    @property(cc.SpriteFrame)
    mSpriteFrame: cc.SpriteFrame = null;
    
    /**  触摸开始点 */
    _mTouchStartPoint: cc.Vec2;
    /**  触移开关 */
    _mTouchType: boolean = false;

    //可进行摸牌区域
    //_mCanTouchFrame: cc.Vec2 = new cc.Vec2(100, 100);
    _mCanTouchFrameX: number = 60;
    _mCanTouchFrameY: number = 60;
    /**  中心点 */
    _mNodePos: cc.Vec3;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        
        this._mNodePos = this.node.parent.convertToWorldSpaceAR(this.node.position);
    }

    
    onTouchStart(event: cc.Event.EventTouch): void{
        this._mTouchStartPoint = new cc.Vec2(event.getLocation().x, event.getLocation().y);

        //处理可触摸区域
        let size = this.node.getContentSize();
        if ( this._mTouchStartPoint.x < this._mNodePos.x - size.width/2  + this._mCanTouchFrameX  ||   this._mNodePos.x + size.width/2 - this._mCanTouchFrameX < this._mTouchStartPoint.x   ) {
            if (this._mTouchStartPoint.y < this._mNodePos.x - size.height/2 + this._mCanTouchFrameY || this._mNodePos.x + size.height/2 - this._mCanTouchFrameY < this._mTouchStartPoint.y) {
                console.log("可摸 位置是" + this._mTouchStartPoint);
                this._mTouchType = true;
            }
        }
    }

    onTouchMove(event: cc.Event.EventTouch): void{
        event.stopPropagation();
        if (this._mTouchType) {
            let pos = event.getLocation();
            this.computePoint(new cc.Vec2(pos.x, pos.y));
        }

    }

    onTouchEnd(event: cc.Event.EventTouch) :void {
        event.stopPropagation();
    }

    /**
     * 计算要传入shader的点
     *  hard to do that 
     *  
     */
    computePoint(pos: cc.Vec2) : void {
        // 斜率
        let k = (this._mTouchStartPoint.y - pos.y) / (this._mTouchStartPoint.x - pos.x);
        // 长度
        let h = Math.sqrt((this._mTouchStartPoint.y - pos.y) * (this._mTouchStartPoint.y - pos.y) + (this._mTouchStartPoint.x - pos.x) * (this._mTouchStartPoint.x - pos.x));
        // 位置
        // 限制 方向
        if (this._mTouchStartPoint.x < this._mNodePos.x) {
            //左侧 往左不行
            if (this._mTouchStartPoint.x > pos.x) {
                console.log('这样往左不行哦');
            } else {
                let k2 = -1 / k;
                let B = pos.y - k2 * pos.x;
                
            }


        } else {
            //右侧 往右不行
            if (this._mTouchStartPoint.x > pos.x) {
                console.log('这样往右不行哦');
            } else {
                
                let k2 = -1 / k;
                let B = pos.y - k2 * pos.x;
            }
            
        }

    }


   
}
