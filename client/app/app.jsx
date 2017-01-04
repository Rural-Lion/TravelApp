// App - all state is held here for now
  // LandingPage
    // Inputs
    // PlanVacationButton
    // InterestButtons
      // interestButton
  // ResultsPage
    // NavBar
    // EntityList
      // EntityListEntry
    // Map

import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import axios from 'axios';
import { INTERESTS, generateActivities, getCoordinates, FancyBorder } from './helpers';
import LandingPage from './LandingPage/LandingPage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

class App extends Component {
  constructor() {
    super();
    this.state = {
      // inputs from landing page
      userQuery: {
        budgetOfTrip: 0,
        lengthOfTrip: 0,
        startingLocation: '',
        distanceOfTrip: 0,
        startingLocationCoordinates: { lat: 37.775, lng: -122.419 },
      },
      // users interests, generated from clicking interest buttons on landing page
      userInterests: [],
      // list of results, generated from api call, used by results page
      entities: [],
    };

    this.handleInterestButtonClick = this.handleInterestButtonClick.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handlePlanButtonClick = this.handlePlanButtonClick.bind(this);

    this.routes = (
      <div>
        <Route
          path="/"
          component={() =>
          (<LandingPage
            interests={INTERESTS}
            handleInterestButtonClick={this.handleInterestButtonClick}
            handlePlanButtonClick={this.handlePlanButtonClick}
            handleChange={this.handleInputOnChange}
            userQuery={this.state.userQuery}
            userInterests={this.state.userInterests}
          />)}
        />
        <Route
          path="/results"
          component={() =>
          (<ResultsPage
            userQuery={this.state.userQuery}
            entities={this.state.entities}
            handlePlanButtonClick={this.handlePlanButtonClick}
          />)}
        />
        <Route path="*" component={NotFound} />
      </div>
    );
  }

  handleInterestButtonClick(e) {
    const newArray = this.state.userInterests.slice();
    const indexOf = newArray.indexOf(e.target.innerHTML);
    if (indexOf === -1) {
      newArray.push(e.target.innerHTML);
    } else {
      newArray.splice(indexOf, 1);
    }
    this.setState({
      userInterests: newArray,
    });
  }

  handleInputOnChange(e) {
    const userQuery = Object.assign({}, this.state.userQuery);
    const key = e.target.dataset.tag;
    userQuery[key] = e.target.value;
    this.setState({
      userQuery,
    });
  }

  handlePlanButtonClick() {
    console.log('called');
    // TODO later - set the state somewhere to have the coordinates of staring location
    //  const userQuery = Object.assign({}, this.state.userQuery);
    //     userQuery.startingLocationCoordinates = latLng;
    //     this.setState(
    //       userQuery,
    //     );

    // TO UNCOMMENT WHEN RESPONSE IS IN THE RIGHT FORMAT:
    // const state = this.state;
    // const sendRequest = function (latLng) {
    //   if (latLng) {
    //     axios.get('/entitiesWithinRadius', {
    //       params: {
    //         latitude: latLng.lat(),
    //         longitude: latLng.lng(),
    //         distance: state.userQuery.distanceOfTrip,
    //         activities: JSON.stringify(state.userInterests),
    //       },
    //     })
    //     .then((res) => {
    //       console.log('RES', res);
    //       this.setState({
    //         entities: generateActivities(res.data.RECDATA),
    //       }, () => { console.log('entities in app', state.entities); });
    //     });
    //   }
    // };
    // getCoordinates(this.state.userQuery.startingLocation, sendRequest);


    // COMMENT OUT AFTER UNCOMMENTING THE PREVIOUS BIT:
    // axios.get('https://ridb.recreation.gov/api/v1/recareas?apiKey=2CE3A404B8824CFEA7652104FCEEE328&full=TRUE&limit=10')
    // .then((res, err) => {
    //   console.log(err);
    //   console.log('this is res ', res);
      // this.setState({
      //   entities: generateActivities(res.data.RECDATA),
      // });
    // });

    this.setState({
      entities: generateActivities(cache.RECDATA),
    });
  }

  render() {
    return (
      <FancyBorder color="red">

        <Router history={hashHistory}>
          { this.routes }
        </Router>
      </FancyBorder>
    );
  }
}

export default App;


let cache = {
  RECDATA: [
    {
      RECAREAADDRESS: [
        {
          PostalCode: 85260,
          RecAreaAddressID: 428908,
          City: 'Scottsdale',
          RecAreaID: 4,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: '',
          RecAreaStreetAddress3: '',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: '16601 N. Pima Road',
          AddressStateCode: 'AZ',
        },
      ],
      FACILITY: [],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -111.87832,
          33.63307,
        ],
      },
      LastUpdatedDate: '2015-05-01',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: '',
      RecAreaReservationURL: '',
      RecAreaLongitude: -111.87832,
      RecAreaID: 4,
      RecAreaPhone: '480-312-6802',
      MEDIA: [],
      LINK: [
        {
          EntityID: 4,
          Description: '',
          LinkType: 'Official Web Site',
          Title: 'Westworld Website',
          EntityLinkID: 7617027,
          EntityType: 'RecArea',
          URL: 'http://www.scottsdaleaz.gov/westworld',
        },
      ],
      RecAreaDescription: "WestWorld is located in north Scottsdale at the base of the McDowell Mountains.  Surrounded by the Sonoran Desert with over 360 acres of pristine landscaping, the covered Equidome Arena, Brett's Barn, and state-of-the-art equine facilities provide a spectacular setting for a variety of venues, including four annual Signature Events: the Barrett/Jackson Classic Auto Auction; All Arabian Horse Show; Sun Country Quarter Horse Show; and the Thunderbird Balloon Classic.\r\n\r\nOther amenities are also available at WestWorld, including horseback riding, catering facility, hiking trails into the McDowell Mountains, and recreational vehicle spaces.\r\n\r\nIn November 1999, the Sanctuary Golf Course opened at the east end of the West World property.  This 18-hole golf course, with only 75 acres of turf, is designed to be water efficient, easily maintained, and was awarded membership in the Audubon Cooperative Sanctuary Program (the first golf course ever to achieve this distinction upon initial opening).",
      RecAreaMapURL: '',
      RecAreaLatitude: 33.63307,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'Area is north of Frank Lloyd Wright Boulevard in Scottsdale, Arizona.  Pima Frontage road is open northbound and southbound.  Call 480.312.6802 or see <A HREF="http://www.scottsdaleaz.gov/Assets/documents/westworld/WWDirections.pdf">Directions</a> here.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 4,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HIKING',
          RecAreaActivityDescription: '',
          ActivityID: 14,
        },
        {
          RecAreaID: 4,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HORSEBACK RIDING',
          RecAreaActivityDescription: '',
          ActivityID: 15,
        },
        {
          RecAreaID: 4,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'PICNICKING',
          RecAreaActivityDescription: '',
          ActivityID: 20,
        },
        {
          RecAreaID: 4,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'RECREATIONAL VEHICLES',
          RecAreaActivityDescription: '',
          ActivityID: 23,
        },
        {
          RecAreaID: 4,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'OTHER RECREATION CONCESSION SITE',
          RecAreaActivityDescription: '',
          ActivityID: 38,
        },
      ],
      RecAreaName: 'WestWorld',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 85342,
          RecAreaAddressID: 780856,
          City: 'Morristown',
          RecAreaID: 6,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: 'Maricopa County Parks & Recreation',
          RecAreaStreetAddress3: '41835 N. Castle Hot Springs Rd.',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: 'Lake Pleasant Regional Park',
          AddressStateCode: 'AZ',
        },
      ],
      FACILITY: [],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -112.32155,
          33.86337,
        ],
      },
      LastUpdatedDate: '2016-12-15',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: 'lakepleasant@mail.maricopa.gov',
      RecAreaReservationURL: '',
      RecAreaLongitude: -112.32155,
      RecAreaID: 6,
      RecAreaPhone: '602-372-7460',
      MEDIA: [],
      LINK: [
        {
          EntityID: 6,
          Description: '',
          LinkType: 'Map',
          Title: 'Lake Pleasant Map',
          EntityLinkID: 14612745,
          EntityType: 'RecArea',
          URL: 'http://www.maricopacountyparks.net/park-locator/lake-pleasant-regional-park/',
        },
        {
          EntityID: 6,
          Description: '',
          LinkType: 'Official Web Site',
          Title: 'Lake Pleasant',
          EntityLinkID: 14612746,
          EntityType: 'RecArea',
          URL: 'http://www.maricopa.gov/parks/lake_pleasant/',
        },
      ],
      RecAreaDescription: "This newly expanded reservoir has 114 miles of shoreline for family recreation uses.  The reservoir boasts a 10-lane boat ramp; parking for 200 vehicles.  Recreational facilities concentrated primarily on the reservoir's western shore.  About 450 picnic sites, 165 campsites ranging from tent to primitive to improved camping with full utility hookups, 14 group-use areas, 4 overlooks, a full-service marina equipped to handle 1,000 boats, and 7 miles of trails.  The lake also has a visitor center an overlook as well as a desert education center.  Along with hiking, biking and watersports, sportfishing is very popular and numerous species inhabit the lake including white bass, largemouth bass, striped bass, channel catfish, and black crappie. A state-issued license is required.\r\n\r\nContact/Entry Station phone number is 928-501-1710.\r\n\r\n<A HREF=\"https://www.usbr.gov/projects/index.php?id=311\">New Waddell Dam</a> and Lake Pleasant are features of the <A HREF=\"https://www.usbr.gov/projects/index.php?id=504\">Central Arizona Project</a>.",
      RecAreaMapURL: 'http://www.maricopa.gov/parks/lake_pleasant/images/lake_map_large.jpg',
      RecAreaLatitude: 33.86337,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'Site is about 30 miles from Phoenix, Arizona.  North on I-17, west on State Hwy. 74.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BIKING',
          RecAreaActivityDescription: '',
          ActivityID: 5,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BOATING',
          RecAreaActivityDescription: '',
          ActivityID: 6,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HISTORIC & CULTURAL SITE',
          RecAreaActivityDescription: '',
          ActivityID: 8,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CAMPING',
          RecAreaActivityDescription: '',
          ActivityID: 9,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'FISHING',
          RecAreaActivityDescription: '',
          ActivityID: 11,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HIKING',
          RecAreaActivityDescription: '',
          ActivityID: 14,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'OFF HIGHWAY VEHICLE',
          RecAreaActivityDescription: '',
          ActivityID: 18,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'PICNICKING',
          RecAreaActivityDescription: '',
          ActivityID: 20,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'RECREATIONAL VEHICLES',
          RecAreaActivityDescription: '',
          ActivityID: 23,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'VISITOR CENTER',
          RecAreaActivityDescription: '',
          ActivityID: 24,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WATER SPORTS',
          RecAreaActivityDescription: '',
          ActivityID: 25,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WILDLIFE VIEWING',
          RecAreaActivityDescription: '',
          ActivityID: 26,
        },
        {
          RecAreaID: 6,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'OTHER RECREATION CONCESSION SITE',
          RecAreaActivityDescription: '',
          ActivityID: 38,
        },
      ],
      RecAreaName: 'Lake Pleasant',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 80446,
          RecAreaAddressID: 428866,
          City: 'Granby',
          RecAreaID: 9,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: 'P.O. Box 10',
          RecAreaStreetAddress3: '',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: 'U.S. Forest Service',
          AddressStateCode: 'CO',
        },
      ],
      FACILITY: [],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -105.86078,
          40.2168,
        ],
      },
      LastUpdatedDate: '2015-05-01',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: '',
      RecAreaReservationURL: '',
      RecAreaLongitude: -105.86078,
      RecAreaID: 9,
      RecAreaPhone: '970-887-4100',
      MEDIA: [],
      LINK: [
        {
          EntityID: 9,
          Description: '',
          LinkType: 'Official Web Site',
          Title: 'Bureau of Reclamation Website',
          EntityLinkID: 7616981,
          EntityType: 'RecArea',
          URL: 'http://www.usbr.gov/gp/recreation/sharerec.htm',
        },
      ],
      RecAreaDescription: '<A HREF="http://www.usbr.gov/dataweb/dams/co01666.htm">Shadow Mountain Dam</a> and Reservoir, <A HREF="http://www.usbr.gov/dataweb/html/cbt.html">Colorado-Big Thompson Project</a>, are on the Colorado River below its confluence with the Grand Lake outlet.  Developments include 1 campground with 80 campsites and 2 boat-launch ramps. Good access exists. Total water surface available for recreation is approximately 1,346 surface acres and 8 miles of shoreline. Primary recreational activities are camping, fishing, and power boating. Primary sport fish are bown trout, rainbow trout, and salmon. Facilities closed in winter due to ice and snow conditions. <A HREF="http://www.usbr.gov/gp-bin/arcweb_sharesco.pl">Current Reservoir Levels</a>.',
      RecAreaMapURL: '',
      RecAreaLatitude: 40.2168,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'North from Granby, Colorado on U.S. 34.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 9,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BOATING',
          RecAreaActivityDescription: '',
          ActivityID: 6,
        },
        {
          RecAreaID: 9,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CAMPING',
          RecAreaActivityDescription: '',
          ActivityID: 9,
        },
        {
          RecAreaID: 9,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'FISHING',
          RecAreaActivityDescription: '',
          ActivityID: 11,
        },
        {
          RecAreaID: 9,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HIKING',
          RecAreaActivityDescription: '',
          ActivityID: 14,
        },
        {
          RecAreaID: 9,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'PICNICKING',
          RecAreaActivityDescription: '',
          ActivityID: 20,
        },
        {
          RecAreaID: 9,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'RECREATIONAL VEHICLES',
          RecAreaActivityDescription: '',
          ActivityID: 23,
        },
        {
          RecAreaID: 9,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WATER SPORTS',
          RecAreaActivityDescription: '',
          ActivityID: 25,
        },
      ],
      RecAreaName: 'Shadow Mountain Lake',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 99709,
          RecAreaAddressID: 3000,
          City: 'Fairbanks',
          RecAreaID: 10,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: 'Fairbanks District Office',
          RecAreaStreetAddress3: ' 1150 University Avenue',
          LastUpdatedDate: '2008-12-29',
          RecAreaStreetAddress1: ' Bureau of Land Management',
          AddressStateCode: 'AK',
        },
      ],
      FACILITY: [
        {
          ResourceLink: 'https://ridb.recreation.gov/api/v1/facilities/252494',
          FacilityID: 252494,
          FacilityName: 'White Mountains National Recreation Area',
        },
      ],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -147.214,
          65.546,
        ],
      },
      LastUpdatedDate: '2012-06-02',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 126,
          OrgImageURL: 'blm.gif',
          OrgURLText: 'testing2',
          OrgURLAddress: 'http://www.blm.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BLM',
          OrgName: 'Bureau of Land Management',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: 'AK_FDO_GeneralDelivery@blm.gov',
      RecAreaReservationURL: ' ',
      RecAreaLongitude: -147.214,
      RecAreaID: 10,
      RecAreaPhone: '800.437.7021',
      MEDIA: [],
      LINK: [
        {
          EntityID: 10,
          Description: '',
          LinkType: 'Official Web Site',
          Title: '',
          EntityLinkID: 14137,
          EntityType: 'RecArea',
          URL: 'http://www.blm.gov/pgdata/content/ak/en/prog/nlcs/white_mtns.html',
        },
      ],
      RecAreaDescription: 'This 1-million-acre area is used primarily from February to April, when dog-mushers, snowmobilers, and skiers come to take advantage of the winter solitude and northern lights. BLM maintains 11 winter cabins, which are connected by a network of more than 240 miles of groomed winter trails. Much of the area is too wet to hike through in the summer, but Beaver Creek National Wild River and several short trails offer opportunities for adventure.',
      RecAreaMapURL: '',
      RecAreaLatitude: 65.546,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'Begin your trip at the BLM office or the Alaska Public Lands Information Center (an interagency office) in Fairbanks, where you can obtain detailed directions, as well as the latest information on trail and weather conditions.  Most summer hiking occurs along the Summit Trail at mile 28, Elliott Highway.  Other hiking trails, along with campgrounds and gold-panning areas, may be found at Nome Creek, accessible from the U.S. Creek Rd., mile 57, Steese Highway. Winter access is at mile 28 and mile 57, Elliott Highway, and at McKay Creek, mile 42, Steese Highway. BLM has also developed a new winter access point at U.S. Creek, mile 57, Steese Highway.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'AUTO TOURING',
          RecAreaActivityDescription: '',
          ActivityID: 4,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BOATING',
          RecAreaActivityDescription: '',
          ActivityID: 6,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CLIMBING',
          RecAreaActivityDescription: '',
          ActivityID: 7,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CAMPING',
          RecAreaActivityDescription: '',
          ActivityID: 9,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'INTERPRETIVE PROGRAMS',
          RecAreaActivityDescription: '',
          ActivityID: 10,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'FISHING',
          RecAreaActivityDescription: '',
          ActivityID: 11,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HIKING',
          RecAreaActivityDescription: '',
          ActivityID: 14,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HUNTING',
          RecAreaActivityDescription: '',
          ActivityID: 16,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'OFF HIGHWAY VEHICLE',
          RecAreaActivityDescription: '',
          ActivityID: 18,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'PICNICKING',
          RecAreaActivityDescription: '',
          ActivityID: 20,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WINTER SPORTS',
          RecAreaActivityDescription: '',
          ActivityID: 22,
        },
        {
          RecAreaID: 10,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WILDLIFE VIEWING',
          RecAreaActivityDescription: '',
          ActivityID: 26,
        },
      ],
      RecAreaName: 'White Mountains National Recreation Area',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 95630,
          RecAreaAddressID: 761756,
          City: 'Folsom',
          RecAreaID: 11,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: '7806 Folsom Auburn Rd.',
          RecAreaStreetAddress3: '',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: 'California Department of Parks & Recreation',
          AddressStateCode: 'CA',
        },
      ],
      FACILITY: [],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -121.16976,
          38.70519,
        ],
      },
      LastUpdatedDate: '2016-11-14',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: 'plucero@mp.usbr.gov',
      RecAreaReservationURL: '',
      RecAreaLongitude: -121.16976,
      RecAreaID: 11,
      RecAreaPhone: '916-988-0205',
      MEDIA: [],
      LINK: [
        {
          EntityID: 11,
          Description: '',
          LinkType: 'Official Web Site',
          Title: 'California Parks Web Site',
          EntityLinkID: 14220196,
          EntityType: 'RecArea',
          URL: 'http://www.parks.ca.gov/default.asp?page_id=500',
        },
      ],
      RecAreaDescription: 'Recreation at Folsom Reservoir is managed by the California Department of Parks and Recreation under agreement with the Bureau of Reclamation, Central California Area Office.   The reservoir was created by <A HREF="http://www.usbr.gov/mp/sod/projects/folsom/">Folsom Dam</a> across the American River. The dam is a feature of the Central Valley Project - American River Division - <A HREF="http://www.usbr.gov/projects/Project.jsp?proj_Name=Folsom+and+Sly+Park+Units+Project">Folsom and Sly Park Units</a>. Folsom Lake offers 75 miles of shoreline.  Usually open  7 days a week, 7:00 a.m. to 10:00 p.m., contact the park office for seasonal variations.  Facilities include 3 public campgrounds, 2 with showers, 60 miles of equestrian trails, 10 miles of paved bicycle trails, 8 miles of advanced mountain bike trails, and excellent year-round bank or boat fishing.  Several launch ramps provide continuous boat launching access throughout the lake fluctuation zone.  At capacity, Good fishing for both cold- and warm-water species including rainbow trout, brown trout, black bass, catfish, crappie, and bluegill.  The American River Water Education Center at Folsom Dam contains exhibits that promote water education directly related to the American River Watershed.',
      RecAreaMapURL: '',
      RecAreaLatitude: 38.70519,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'Folsom Lake is located 20 miles northeast of Sacramento via Highway US 50.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BIKING',
          RecAreaActivityDescription: '',
          ActivityID: 5,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BOATING',
          RecAreaActivityDescription: '',
          ActivityID: 6,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HISTORIC & CULTURAL SITE',
          RecAreaActivityDescription: '',
          ActivityID: 8,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CAMPING',
          RecAreaActivityDescription: '',
          ActivityID: 9,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'INTERPRETIVE PROGRAMS',
          RecAreaActivityDescription: '',
          ActivityID: 10,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'FISHING',
          RecAreaActivityDescription: '',
          ActivityID: 11,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HIKING',
          RecAreaActivityDescription: '',
          ActivityID: 14,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HORSEBACK RIDING',
          RecAreaActivityDescription: '',
          ActivityID: 15,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'PICNICKING',
          RecAreaActivityDescription: '',
          ActivityID: 20,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'RECREATIONAL VEHICLES',
          RecAreaActivityDescription: '',
          ActivityID: 23,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'VISITOR CENTER',
          RecAreaActivityDescription: '',
          ActivityID: 24,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WATER SPORTS',
          RecAreaActivityDescription: '',
          ActivityID: 25,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WILDLIFE VIEWING',
          RecAreaActivityDescription: '',
          ActivityID: 26,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'OTHER RECREATION CONCESSION SITE',
          RecAreaActivityDescription: '',
          ActivityID: 38,
        },
        {
          RecAreaID: 11,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'ENVIRONMENTAL EDUCATION',
          RecAreaActivityDescription: '',
          ActivityID: 103,
        },
      ],
      RecAreaName: 'Folsom Lake',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 95630,
          RecAreaAddressID: 761757,
          City: 'Folsom',
          RecAreaID: 12,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: '7794 Folsom Dam Road',
          RecAreaStreetAddress3: '',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: 'USBR, Central CA Area Office',
          AddressStateCode: 'CA',
        },
      ],
      FACILITY: [],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -121.22021,
          38.63315,
        ],
      },
      LastUpdatedDate: '2016-11-14',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: 'plucero@mp.usbr.gov',
      RecAreaReservationURL: '',
      RecAreaLongitude: -121.22021,
      RecAreaID: 12,
      RecAreaPhone: '916-988-1707',
      MEDIA: [],
      LINK: [],
      RecAreaDescription: 'The 69 mile long Folsom South Canal originates at Nimbus Dam on the American River in Sacramento County and extends southward, paralleling and to the east of State Highway 99 through San Joaquin County.  Canal bikeway is open year round, and can be accessed at many locations. Call for details.',
      RecAreaMapURL: '',
      RecAreaLatitude: 38.63315,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'Nimbus Dam on the American River in Sacramento County and extends southward, paralleling and to the east of State Highway 99 through San Joaquin County.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 12,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BIKING',
          RecAreaActivityDescription: '',
          ActivityID: 5,
        },
        {
          RecAreaID: 12,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HIKING',
          RecAreaActivityDescription: '',
          ActivityID: 14,
        },
        {
          RecAreaID: 12,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HORSEBACK RIDING',
          RecAreaActivityDescription: '',
          ActivityID: 15,
        },
      ],
      RecAreaName: 'Folsom S. Canal Rec. Trail',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 85086,
          RecAreaAddressID: 770892,
          City: 'Phoenix',
          RecAreaID: 14,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: '5000 W. Carefree Highway',
          RecAreaStreetAddress3: '',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: 'Arizona Game and Fish Department',
          AddressStateCode: 'AZ',
        },
      ],
      FACILITY: [],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -114.47003,
          32.81981,
        ],
      },
      LastUpdatedDate: '2016-11-29',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: '',
      RecAreaReservationURL: '',
      RecAreaLongitude: -114.47003,
      RecAreaID: 14,
      RecAreaPhone: '602-942-3000',
      MEDIA: [],
      LINK: [
        {
          EntityID: 14,
          Description: '',
          LinkType: 'Official Web Site',
          Title: 'Arizona Game and Fish Department',
          EntityLinkID: 14401988,
          EntityType: 'RecArea',
          URL: 'https://www.azgfd.com/wildlife/viewing/wheretogo/mittrylake/',
        },
      ],
      RecAreaDescription: 'Mittry Lake Wildlife Area lies in and adjacent to the floodplain of the Colorado River between <A HREF="https://www.usbr.gov/projects/index.php?id=297">Laguna</a> and <A HREF="https://www.usbr.gov/projects/index.php?id=150">Imperial Dams</a>.  Mittry Lake covers approximately 750 acres, with much of the shoreline covered with cattails and bullrush.  Mittry Lake has recently undergone rehabilitation work including marsh dredging, revegetation and fish habitat improvement, making it an ideal location for small game hunting and sportfishing.  Major species for small game hunting include waterfowl, doves, quail, rabbit and raccoon.  Major species of fish in the lake include largemouth bass, channel catfish, flathead catfish, crappie, and bluegill.  There are no camping facilities and the area is for day use only.  However there is a 3-lane boat launch ramp for motorized boating on the lake.  The area is also very popular for nature study and birdwatching. <A HREF="http://www.blm.gov/az/st/en/prog/recreation/watchable/mittry.html"> More information. </a>',
      RecAreaMapURL: '',
      RecAreaLatitude: 32.81981,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'Laguna Dam is approximately 18 miles northeast of Yuma, Arizona.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 14,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BOATING',
          RecAreaActivityDescription: '',
          ActivityID: 6,
        },
        {
          RecAreaID: 14,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CAMPING',
          RecAreaActivityDescription: '',
          ActivityID: 9,
        },
        {
          RecAreaID: 14,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'FISHING',
          RecAreaActivityDescription: '',
          ActivityID: 11,
        },
        {
          RecAreaID: 14,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HUNTING',
          RecAreaActivityDescription: '',
          ActivityID: 16,
        },
        {
          RecAreaID: 14,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WATER SPORTS',
          RecAreaActivityDescription: '',
          ActivityID: 25,
        },
      ],
      RecAreaName: 'Imperial Reservoir Area:  Mittry Lake Wildlife Area',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 92283,
          RecAreaAddressID: 770894,
          City: 'Winterhaven',
          RecAreaID: 15,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: 'P.O. Box 848',
          RecAreaStreetAddress3: '',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: 'Picacho State Park',
          AddressStateCode: 'CA',
        },
      ],
      FACILITY: [],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -114.61518,
          33.01863,
        ],
      },
      LastUpdatedDate: '2016-11-29',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: 'picacho@parks.ca.gov',
      RecAreaReservationURL: '',
      RecAreaLongitude: -114.61518,
      RecAreaID: 15,
      RecAreaPhone: '760-996-2963',
      MEDIA: [],
      LINK: [
        {
          EntityID: 15,
          Description: '',
          LinkType: 'Map',
          Title: 'Imperial Reservoir Area:  Picacho State Recreation Area Map',
          EntityLinkID: 14401991,
          EntityType: 'RecArea',
          URL: 'http://www.parks.ca.gov/pages/641/files/CampgroundMap-PicachoSRA2014WEB.pdf',
        },
        {
          EntityID: 15,
          Description: '',
          LinkType: 'Official Web Site',
          Title: 'California State Parks ',
          EntityLinkID: 14401992,
          EntityType: 'RecArea',
          URL: 'http://www.parks.ca.gov/?page_id=641',
        },
      ],
      RecAreaDescription: 'This is a popular area for camping, fishing, desert exploring and river running.  The area also has a group camping area (50 person), a group boat-in area (50 person), and three individual boat-in camp areas.  There are 5 ramadas and 2 large picnic areas as well.  Restroom facilities include showers.  There are 5 campgrounds and two 2-lane boat launch ramps.  Birdwatching, small game hunting for quail, doves, and ducks, and sportfishing are among other favorite activities at this recreation area.',
      RecAreaMapURL: 'http://www.parks.ca.gov/lat_long_map/default.asp?lvl_id=281',
      RecAreaLatitude: 33.01863,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'This state recreation area is 25 miles north of Yuma, Arizona on the Colorado River.  There is an 18 mile dirt road upon entering the area and it is not recommended for large trailers.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 15,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BIKING',
          RecAreaActivityDescription: '',
          ActivityID: 5,
        },
        {
          RecAreaID: 15,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BOATING',
          RecAreaActivityDescription: '',
          ActivityID: 6,
        },
        {
          RecAreaID: 15,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CAMPING',
          RecAreaActivityDescription: '',
          ActivityID: 9,
        },
        {
          RecAreaID: 15,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'FISHING',
          RecAreaActivityDescription: '',
          ActivityID: 11,
        },
        {
          RecAreaID: 15,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HIKING',
          RecAreaActivityDescription: '',
          ActivityID: 14,
        },
        {
          RecAreaID: 15,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'PICNICKING',
          RecAreaActivityDescription: '',
          ActivityID: 20,
        },
        {
          RecAreaID: 15,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WATER SPORTS',
          RecAreaActivityDescription: '',
          ActivityID: 25,
        },
        {
          RecAreaID: 15,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WILDLIFE VIEWING',
          RecAreaActivityDescription: '',
          ActivityID: 26,
        },
      ],
      RecAreaName: 'Imperial Reservoir Area:  Picacho State Recreation Area',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 86429,
          RecAreaAddressID: 753752,
          City: 'Bullhead City',
          RecAreaID: 16,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: 'Davis Dam Field Division',
          RecAreaStreetAddress3: '',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: 'Bureau of Reclamation',
          AddressStateCode: 'AZ',
        },
      ],
      FACILITY: [],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -109.7511,
          33.99601,
        ],
      },
      LastUpdatedDate: '2016-10-31',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: 'darend@usbr.gov',
      RecAreaReservationURL: '',
      RecAreaLongitude: -109.7511,
      RecAreaID: 16,
      RecAreaPhone: '928-754-3628',
      MEDIA: [],
      LINK: [
        {
          EntityID: 16,
          Description: '',
          LinkType: 'Official Web Site',
          Title: 'Bureau of Reclamation web site',
          EntityLinkID: 14050775,
          EntityType: 'RecArea',
          URL: 'http://www.usbr.gov/lc/hooverdam/davisdam.html',
        },
      ],
      RecAreaDescription: 'Located 8 miles north of the City of Laughlin on the Nevada side and 10 miles north of Bullhead City on the Arizona side of the Colorado River.  Lake Mohave resulted from the construction of Davis Dam which spans the Colorado River below Hoover Dam, a portion of the Boulder Canyon Project.  On the Arizona side of the river and managed by the Mohave County Parks Department (1-877-757-0915) is Davis Dam Camp, a campground and day use area well appointed for the physically challenged angler and also has boat launching facilities, numerous campsites, RV hookups, and picnic areas. Davis Dam Camp was built to house the workers who constructed Davis Dam.  A few of the original camp buildings remain, although they have been altered. Available fish species include rainbow trout, striped bass, and catfish.  The City of Laughlin has numerous casinos, lodging, eating establishment, and entertainment.<A HREF="http://www.usbr.gov/projects/Facility.jsp?fac_Name=Parker+Dam">Parker Dam</a> and <A HREF="http://www.usbr.gov/projects/Facility.jsp?fac_Name=Davis+Dam">Davis Dam</a> (originally named Bullshead) comprise the <A HREF="http://www.usbr.gov/projects/Project.jsp?proj_Name=Parker-Davis%20Project">Parker-Davis Project.</a>',
      RecAreaMapURL: '',
      RecAreaLatitude: 33.99601,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'Take US 95 south from Las Vegas about 30 miles, east on State Highway 164.  Parking is available near the dam site but, <b>as of April 2004, the roadway across Davis Dam is closed to all vehicles; pedestrian and bicycle access to the dam is still allowed.</b>',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 16,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BOATING',
          RecAreaActivityDescription: '',
          ActivityID: 6,
        },
        {
          RecAreaID: 16,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HISTORIC & CULTURAL SITE',
          RecAreaActivityDescription: '',
          ActivityID: 8,
        },
        {
          RecAreaID: 16,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CAMPING',
          RecAreaActivityDescription: '',
          ActivityID: 9,
        },
        {
          RecAreaID: 16,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'INTERPRETIVE PROGRAMS',
          RecAreaActivityDescription: '',
          ActivityID: 10,
        },
        {
          RecAreaID: 16,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'FISHING',
          RecAreaActivityDescription: '',
          ActivityID: 11,
        },
        {
          RecAreaID: 16,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'PICNICKING',
          RecAreaActivityDescription: '',
          ActivityID: 20,
        },
        {
          RecAreaID: 16,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WATER SPORTS',
          RecAreaActivityDescription: '',
          ActivityID: 25,
        },
      ],
      RecAreaName: 'Davis Dam',
    },
    {
      RECAREAADDRESS: [
        {
          PostalCode: 94558,
          RecAreaAddressID: 777008,
          City: 'Napa',
          RecAreaID: 17,
          RecAreaAddressType: '',
          AddressCountryCode: 'USA',
          RecAreaStreetAddress2: '5520 Knoxville Road',
          RecAreaStreetAddress3: '',
          LastUpdatedDate: '',
          RecAreaStreetAddress1: 'Lake Berryessa Field Office',
          AddressStateCode: 'CA',
        },
      ],
      FACILITY: [
        {
          ResourceLink: 'https://ridb.recreation.gov/api/v1/facilities/250000',
          FacilityID: 250000,
          FacilityName: 'OAK SHORES DAY USE AREA (CA)',
        },
      ],
      OrgRecAreaID: '',
      GEOJSON: {
        TYPE: 'Point',
        COORDINATES: [
          -122.10276,
          38.51173,
        ],
      },
      LastUpdatedDate: '2016-12-09',
      EVENT: [],
      ORGANIZATION: [
        {
          OrgID: 129,
          OrgImageURL: 'bor.gif',
          OrgURLText: '',
          OrgURLAddress: 'http://www.usbr.gov',
          OrgType: 'Department of the Interior',
          OrgAbbrevName: 'BOR',
          OrgName: 'Bureau of Reclamation',
          OrgJurisdictionType: 'Federal',
          OrgParentID: 139,
          LastUpdatedDate: "{ts '2007-02-26 00:00:00'}",
        },
      ],
      RecAreaEmail: '',
      RecAreaReservationURL: '',
      RecAreaLongitude: -122.10276,
      RecAreaID: 17,
      RecAreaPhone: '707-966-2111',
      MEDIA: [],
      LINK: [
        {
          EntityID: 17,
          Description: '',
          LinkType: 'Official Web Site',
          Title: 'Reclamation Berryessa Web Site',
          EntityLinkID: 14533571,
          EntityType: 'RecArea',
          URL: 'http://www.usbr.gov/mp/berryessa/facts.html',
        },
      ],
      RecAreaDescription: "Nestled between Blue Ridge and Cedar Roughs, east of the Napa Valley, Lake Berryessa offers year-round recreation opportunities. Lake Berryessa's water reaches temperatures of up to 75 degrees in the summer, making it an ideal place for water sports. Anglers enjoy fishing for both cold and warm water species, such as rainbow trout, bass, catfish, crappie, and bluegill. The Bureau of Reclamation provides two large day use areas (Oak Shores and Smittle Creek), Capell Cove launch ramp, and many smaller dispersed day use areas. There are Recreation Areas around the lake that are managed by concessionaires under contract with Reclamation and provide camping, day use and boating facilities. Contact the concession areas directly for information about amenities.",
      RecAreaMapURL: '',
      RecAreaLatitude: 38.51173,
      StayLimit: '',
      RecAreaFeeDescription: '',
      RecAreaDirections: 'Lake Berryessa is located 70 miles northeast of San Francisco and 40 miles west of Sacramento.  Nearest towns are Napa to the southwest or Winters to the east.  Nearest highways are state highways 121 and 128.',
      Keywords: '',
      ACTIVITY: [
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BIKING',
          RecAreaActivityDescription: '',
          ActivityID: 5,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'BOATING',
          RecAreaActivityDescription: '',
          ActivityID: 6,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HISTORIC & CULTURAL SITE',
          RecAreaActivityDescription: '',
          ActivityID: 8,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'CAMPING',
          RecAreaActivityDescription: '',
          ActivityID: 9,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'INTERPRETIVE PROGRAMS',
          RecAreaActivityDescription: '',
          ActivityID: 10,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'FISHING',
          RecAreaActivityDescription: '',
          ActivityID: 11,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HIKING',
          RecAreaActivityDescription: '',
          ActivityID: 14,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HORSEBACK RIDING',
          RecAreaActivityDescription: '',
          ActivityID: 15,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'PICNICKING',
          RecAreaActivityDescription: '',
          ActivityID: 20,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WINTER SPORTS',
          RecAreaActivityDescription: '',
          ActivityID: 22,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'RECREATIONAL VEHICLES',
          RecAreaActivityDescription: '',
          ActivityID: 23,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'VISITOR CENTER',
          RecAreaActivityDescription: '',
          ActivityID: 24,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'WILDLIFE VIEWING',
          RecAreaActivityDescription: '',
          ActivityID: 26,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'OTHER RECREATION CONCESSION SITE',
          RecAreaActivityDescription: '',
          ActivityID: 38,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'HOTEL/LODGE/RESORT FS OWNED',
          RecAreaActivityDescription: '',
          ActivityID: 40,
        },
        {
          RecAreaID: 17,
          RecAreaActivityFeeDescription: '',
          ActivityName: 'ENVIRONMENTAL EDUCATION',
          RecAreaActivityDescription: '',
          ActivityID: 103,
        },
      ],
      RecAreaName: 'Lake Berryessa',
    },
  ],
  METADATA: {
    RESULTS: {
      CURRENT_COUNT: 10,
      TOTAL_COUNT: 3223,
    },
    SEARCH_PARAMETERS: {
      QUERY: '',
      OFFSET: 0,
      LIMIT: 10,
    },
  },
};
