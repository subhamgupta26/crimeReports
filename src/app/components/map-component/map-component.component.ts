import {Component, OnInit} from '@angular/core';

import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import OlVectorLayer from 'ol/layer/vector';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import OlVectorSource from 'ol/source/vector';
import OlDrawInteraction from 'ol/interaction/draw';
import OlFeature from 'ol/feature';
import OlGeometryPoint from 'ol/geom/point';
import OlProject from 'ol/proj'; 
import OlStyleStyle from 'ol/style/style';
import OlStyleIcon from 'ol/style/icon'; 
import { FileServiceService } from "app/services/file-service.service";

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit  {
 map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  vector: OlVectorLayer;
  markerLayer: OlVectorLayer;
  vectorSource: any;
  draw : any;
  markerSource:any;

iconFeature = new OlFeature({
  geometry: new OlGeometryPoint(OlProject.transform([7, 51], 'EPSG:4326',     
  'EPSG:3857')),
  name: 'Null Island',
  population: 4000,
  rainfall: 500
});



iconFeatures=[this.iconFeature];

iconStyle = new OlStyleStyle({
  image: new OlStyleIcon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: 'http://openlayers.org/en/v3.9.0/examples/data/icon.png'
  }))
});

  constructor(private fileService:FileServiceService) {
  }

  ngOnInit() {
    this.fileService.getJSON().subscribe((res)=>{
      console.log(res);
      console.log("trying this out"+res.data[0][17]);
      // for(let record of res.data){
      //   console.log("record ",record[17]);
      // }
    let iconFeature2 = new OlFeature({
  geometry: new OlGeometryPoint(OlProject.transform([res.data[0][17], res.data[0][18]], 'EPSG:4326',     
  'EPSG:3857')),
  name: 'Null Island Two',
  population: 4001,
  rainfall: 501
});
let iconFeature1 = new OlFeature({
  geometry: new OlGeometryPoint(OlProject.transform([8, 52], 'EPSG:4326',     
  'EPSG:3857')),
  name: 'Null Island Two',
  population: 4001,
  rainfall: 501
});
this.iconFeatures.push(iconFeature1);
this.iconFeatures.push(iconFeature2);
   
    this.source = new OlXYZ({
      // Tiles from Mapbox (Light)
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });
    this.vectorSource= new OlVectorSource({
      wrapX :true
    })
    this.markerSource= new OlVectorSource({
      features: this.iconFeatures
    })

    this.vector = new OlVectorLayer({
      source: this.vectorSource
    })

    this.markerLayer= new OlVectorLayer({
      source: this.markerSource,
      style: this.iconStyle
    })


    this.view = new OlView({
      center: OlProj.fromLonLat([6.661594, 50.433237]),
      zoom: 3,
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer, this.vector, this.markerLayer],
      view: this.view
    });
    this.addInteraction();
     })
  }

     addInteraction() {
        const value = 'LineString';
        
          this.draw = new OlDrawInteraction({
            source: this.vectorSource,
            type: value,
            freehand: true
          });
          this.map.addInteraction(this.draw);
        
      }

     







}
