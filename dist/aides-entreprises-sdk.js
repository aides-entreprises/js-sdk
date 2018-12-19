!function(t){var e={};function r(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(i,s,function(e){return t[e]}.bind(null,s));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);class i{constructor(t){this.query={},this.sdk=t,this._offset=0,this._limit=20}formatData(t){return"object"!=typeof t&&(t=[t]),t}projets(t){return t=this.formatData(t),this.query.projets=t.join(","),this}profils(t){return t=this.formatData(t),console.log(t),this.query.profils=t.join(","),this}niveaux(t){return t=this.formatData(t),this.query.niveaux=t.join(","),this}natures(t){return t=this.formatData(t),this.query.natures=t.join(","),this}territoire(t){return this.query.territoire=t,this}effectif(t){return 0==t?delete this.query.effectif:this.query.effectif=t,this}criteres(t){return t=this.formatData(t),this.query.criteres=t.join(","),this}remove(t,e){try{let i=this.query[t].split(","),s=[];for(var r in i)i[r]!=e&&s.push(i[r]);s.length>0?this.query[t]=s.join(","):delete this.query[t]}catch(t){console.log(t)}return this}offset(t){return this._offset=t,this}limit(t){return this._limit=t,this}isEmptyQuery(){return Object.keys(this.query).length<1}async execute(t=!0){if(Object.keys(this.query).length<1)return void this.sdk.emit("queryIsEmpty");JSON.stringify(this.query)!=this.lastQuery&&(this._offset=0);let e=await this.sdk.fetch("/aides?clean_html=true&status=1&offset="+this._offset+"&"+Object.entries(this.query).map(([t,e])=>`${t}=${e}`).join("&"));return this.lastQuery=JSON.stringify(this.query),e.meta.total>(this._offset+1)*this._limit?e.showMore=!0:e.showMore=!1,t&&this.sdk.emit("resultat",e),e}}window.aidesEntreprisesSDK=class extends class{constructor(){this.events={}}on(t,e){return"object"!=typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e),()=>this.removeListener(t,e)}removeListener(t,e){if("object"==typeof this.events[t]){const r=this.events[t].indexOf(e);r>-1&&this.events[t].splice(r,1)}}emit(t,...e){"object"==typeof this.events[t]&&this.events[t].forEach(t=>t.apply(this,e))}once(t,e){const r=this.on(t,(...t)=>{r(),e.apply(this,t)})}}{constructor(){super(),this.settings={url:"https://data.aides-entreprises.fr/sdk.php?uri="},this._data={},this._query=null}query(){return this._query||(this._query=new i(this)),this._query}async projets(){if(this._data.projets)return this._data.projets;let t=await this.projetsRaw();t=t.data;let e=[];for(var r in t)for(var i in e.push({id:t[r].categorie.id_proj,nom:t[r].categorie.proj_libelle,parent:0}),t[r].values)e.push({id:t[r].values[i].id_proj,nom:t[r].values[i].proj_libelle,parent:t[r].values[i].proj_parent});return this._data.projets=e,e}async profils(){if(this._data.profils)return this._data.profils;let t=await this.profilsRaw();t=t.data;let e=[];for(var r in t)e.push({id:t[r].id_tut,nom:t[r].tut_libelle});return this._data.profils=e,e}async natures(){if(this._data.natures)return this._data.natures;let t=await this.naturesRaw();t=t.data;let e=[];for(var r in t)e.push({id:t[r].id_typ,nom:t[r].typ_libelle});return this._data.natures=e,e}async niveaux(){if(this._data.niveaux)return this._data.niveaux;let t=await this.niveauxRaw();t=t.data;let e=[];for(var r in t)e.push({id:t[r].id_geo,nom:t[r].geo_nom});return this._data.niveaux=e,e}async criteres(){return[{id:"1",nom:"Demandeur d'emploi"},{id:"2",nom:"Femme"},{id:"3",nom:"Sénior"},{id:"4",nom:"Handicapé"},{id:"5",nom:"Jeune"}]}async typeTerritoires(){if(this._data.types_territoires)return this._data.types_territoires;let t=await this.fetch("/types_territoires");t=t.data;let e={};for(var r in t)e[t[r].id_tte]=t.tte_libelle;return this._data.types_territoires=e,e}async rechercheTerritoiresParNom(t){let e=await this.typeTerritoires(),r=await this.territoiresRaw(t);r=r.data;let i=[];for(var s in r)i.push({id:r[s].id_ter,nom:r[s].ter_libelle,type:e[r[s].ter_fk_type],code_postal:r[s].ter_code,code_insee:r[s].insee});return i}async projetsRaw(){return await this.fetch("/projets")}async profilsRaw(){return await this.fetch("/profils")}async naturesRaw(){return await this.fetch("/natures")}async niveauxRaw(){return await this.fetch("/niveaux")}async typesTerritoiresRaw(){return await this.fetch("/types_territoires")}async territoiresRaw(t){return await this.fetch("/territoires?full_text="+t)}async fetch(t){this.emit("load");let e=await fetch(this.settings.url+encodeURIComponent(t));return this.emit("loadComplete"),e.json()}}}]);