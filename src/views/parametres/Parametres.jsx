import React, { useState } from 'react';
import { TabPanel, TabView } from 'primereact/tabview';



import HeaderContentSub from 'src/components/others/HeaderContentSUb';
import { formatDateString } from 'src/utils/utils';
import ParametrageDatable from 'src/components/tables/parametres/ParametrageDatable';
import { addEquipementsChambre, addTypesChambre, addTypesEtablissement, deleteEquipementsChambre, deleteTypesChambre, deleteTypesEtablissement, getEquipementsChambres, getTypesChambres, getTypesEtablissements, updateEquipementsChambre, updateTypesChambre, updateTypesEtablissement } from 'src/api/parametres/parametres';



const dateBodyCreate = (rowdata)=> formatDateString(rowdata?.createdAt);
const dateBodyUpdated = (rowdata)=> formatDateString(rowdata?.updatedAt);

const bodyIconEquipement = (row)=> <i className={`${row?.icon}`}></i>

//TypeEtablissements
const typeEtablissementsCols = [
  { field: 'type', header: 'Type établissement' },
  { field: 'updatedAt', header: 'Denière modification',body: dateBodyUpdated },
  { field: 'createAt', header: 'Date enregistrement',body: dateBodyCreate  },
];
const typeEtablissementFieldsState={
  type: "",
}



//TypeChambres
const typeChambresCols = [
  { field: 'type', header: 'Type établissement' },
  { field: 'updatedAt', header: 'Denière modification',body: dateBodyUpdated },
  { field: 'createAt', header: 'Date enregistrement',body: dateBodyCreate  },
];
const typeChambreFieldsState={
  type: "",
}


//Equipements Chambre
const equipementChambresCols = [
  { field: 'icon', header: 'Icon',body:bodyIconEquipement },
  { field: 'titre', header: 'Equipement' },
  { field: 'updatedAt', header: 'Denière modification',body: dateBodyUpdated },
  { field: 'createAt', header: 'Date enregistrement',body: dateBodyCreate  },
];
const equipementChambreFieldsState={
  icon: "",
  // image: "",
  titre: "",
}


const ParametresPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);



  return (
    <>
      <div className="container-fluid header-content-page row">
        <div className="col-md-12">
          <HeaderContentSub
            title="Interface de paramètrage"
            subTitle="Paramètrer les données"
          />
        </div>
      </div>
    <section className="parametre-conteneur px-md-4 px-1">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}>

              <TabPanel header="Type Etablissement" key="parametre-typeEtablissement" headerClassName="" >
                <ParametrageDatable
                  querysKeysLabel={'Type Etablissement'}
                  tableCols={typeEtablissementsCols}
                  marqueFieldsState={typeEtablissementFieldsState}
                  queryFunction={getTypesEtablissements}
                  addFunction={addTypesEtablissement}
                  updateFunction={updateTypesEtablissement}
                  deleteFunction={deleteTypesEtablissement}
                />
              </TabPanel>

              <TabPanel header="Type Chambre" key="parametre-typeChambre" headerClassName="" >
                <ParametrageDatable
                  querysKeysLabel={'Type Chambre'}
                  tableCols={typeChambresCols}
                  marqueFieldsState={typeChambreFieldsState}
                  queryFunction={getTypesChambres}
                  addFunction={addTypesChambre}
                  updateFunction={updateTypesChambre}
                  deleteFunction={deleteTypesChambre}
                />
              </TabPanel>

              <TabPanel header="Equipements des chambres" key="parametre-equipementsChambre" headerClassName="" >
                <ParametrageDatable
                  querysKeysLabel={'Equipements Chambre'}
                  tableCols={equipementChambresCols}
                  marqueFieldsState={equipementChambreFieldsState}
                  queryFunction={getEquipementsChambres}
                  addFunction={addEquipementsChambre}
                  updateFunction={updateEquipementsChambre}
                  deleteFunction={deleteEquipementsChambre}
                />
              </TabPanel>
          </TabView>
    </section>

    </>
  );
};

export default ParametresPage;
