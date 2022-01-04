/**
 *  2021年10月12日
 *  @author zyh
 *  @param 滤镜效果
 */
enum RenderType {
    ToScale,
    ToPush,
    ToShutters
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Material)
    mEff_ChangeView: cc.Material[] = [];

    @property(cc.Texture2D)
    mTexture1: cc.Texture2D = null;
    @property(cc.Texture2D)
    mTexture2: cc.Texture2D = null;
    @property(cc.Label)
    mLabel: cc.Label = null;

    _mRenderType: RenderType = RenderType.ToScale;
    _mEffctName: string[] = ['缩放', '推入', '百叶窗',];

    protected onLoad(): void {
        this.scheduleOnce(() => { this.setChangeView(); }, 1);

    }

    private setChangeView(): void {
        this.node.children.forEach(element => {

            let renderComponent = element.getComponents(cc.RenderComponent);
            renderComponent[0].setMaterial(0, this.mEff_ChangeView[this._mRenderType]);
            let material: cc.Material = renderComponent[0].getMaterial(0);
            //material = this.mEff_ChangeView;
            
            material.setProperty('texture', this.mTexture1);
            material.setProperty('outTexture', this.mTexture2);
        });
    }

    private onClickUp(): void {
        if (this._mRenderType != 0) {
            this._mRenderType -= 1;
            this.setChangeView();
            this.mLabel.string = this._mEffctName[this._mRenderType];
        } else {
            console.log('已经到顶了');
        }

    }

    private onClickNext(): void {
        if (this._mRenderType != this._mEffctName.length-1) {
            this._mRenderType += 1;
            this.setChangeView();
            this.mLabel.string = this._mEffctName[this._mRenderType];
        } else {
            console.log('已经到底了');
        }
    }
}
