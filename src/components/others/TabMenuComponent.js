import React from 'react';
import { TabMenu } from 'primereact/tabmenu';

import 'src/assets/css/tabMenuComponent.css'

export default function TabMenuComponent({activeIndex, setActiveIndex,items}) {
    
    return (
        <div className="tab-menu-component">
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)} />
        </div>
    )
}
        