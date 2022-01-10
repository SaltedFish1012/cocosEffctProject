
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

    _mTouchStartPoint: cc.Vec2;
    _mTouchType: boolean = false;

    //可进行摸牌区域
    _mCanTouchFrame: cc.Vec2 = new cc.Vec2(100, 100);
    _mCanTouchFrameX: number = 120;
    _mCanTouchFrameY: number = 120;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd,this);
    }

    
    onTouchStart(event: cc.Event.EventTouch) {
        this._mTouchStartPoint = new cc.Vec2(event.getLocation().x, event.getLocation().y);

        //处理可触摸区域
        let pos: cc.Vec3 = this.node.parent.convertToWorldSpaceAR(this.node.position);
        let size = this.node.getContentSize();
        if ( this._mTouchStartPoint.x < pos.x - size.width/2  + this._mCanTouchFrameX  ||   pos.x + size.width/2 - this._mCanTouchFrameX < this._mTouchStartPoint.x   ) {
            if (this._mTouchStartPoint.y < pos.x - size.height/2 + this._mCanTouchFrameY || pos.x + size.height/2 - this._mCanTouchFrameY < this._mTouchStartPoint.y) {
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

    onTouchEnd() {
        
    }

    /**
     * 计算要传入shader的点
     *  hard to do that 
     */
    computePoint(pos:cc.Vec2) {
        
    }


   
}
