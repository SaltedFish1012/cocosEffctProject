enum RenderType{
    ToScale,
    ToPush ,
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

    _mRenderType: RenderType = RenderType.ToPush;


    protected onLoad(): void {
        
    }

    private setChangeView(): void {
        this.node.children.forEach(element => {
            
            element.getComponents(cc.RenderComponent).forEach(renderComponent => {
                renderComponent.setMaterial(0, this.mEff_ChangeView[1]);
                let material: cc.Material = renderComponent.getMaterial(0);
                //material = this.mEff_ChangeView;
                material.setProperty('texture', this.mTexture1);
                material.setProperty('texture2', this.mTexture2);

                
            });

        }); 
    }

    private onClickUp():void {
        
    }

    private onClickNext():void {
        
    }
}
