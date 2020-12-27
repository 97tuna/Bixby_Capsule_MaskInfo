# Bixby Capsule 마스크 사자
<!-- Made By     : 2_tuna_97 -->

<!-- 빅스비 크루 로고 -->
<p align="center">
    <img width="300px" src="https://user-images.githubusercontent.com/50114556/103166141-8331b580-4862-11eb-810f-279c94adc030.png">
</p>

<!-- 숭실대 Bixby Crew사진 -->
<p align="center">
    <img width="300px" src="https://user-images.githubusercontent.com/50114556/103166155-9d6b9380-4862-11eb-92d7-397f2505e456.jpg">
</p>

<!-- 이미지 -->
<p align="center">
 <a href="#"><img src="https://img.shields.io/badge/build-passing-success"></a>
 <a href="https://bixbydevelopers.com/"><img src="https://img.shields.io/badge/platform-Bixby-blue"></a>
 <a href="https://github.com/BixbyCrew/Bixby_Capsule_MaskInfo/releases/tag/0.2.7"><img src="https://img.shields.io/badge/version-0.2.7-important"></a>
 <a href="#"><img src="https://img.shields.io/badge/language-javascript-yellow"></a>
 <a href="https://github.com/BixbyCrew/Bixby_Capsule_MaskInfo/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green"></a>
</p>

<!-- Capsule Store사진 -->
<p align="center">
    <img width="300px" src="https://user-images.githubusercontent.com/50114556/103174921-7d12f780-48a9-11eb-9c39-d7031a318022.jpg">
    <img width="300px" src="https://user-images.githubusercontent.com/50114556/103174918-7b493400-48a9-11eb-99c3-f7e871a7f143.jpg">
</p>

<!-- 덕분에 챌린지 -->
<p align="center">
    <img width="250px" src="https://user-images.githubusercontent.com/50114556/103176844-88b9ea80-48b8-11eb-9b0f-52ae9dbf522d.jpg">
</p>

## Capsule Structure

> Bixby Capsule은 다음과 같이 3가지로 구성되어 있습니다.
1. javascript <br>
    여기서는 액션에서 받은 정보를 가지고 정보를 실행 또는 처리하는것인데요. API를 사용해서 정보를 받아오거나 이미 저장되어있는 데이터 값을 불러오는 등 다양한 역할을 하게 됩니다.

2. Models <br>
    Bixby의 뼈대를 이루고 있으며 `Action`과 `Concept`로 이루어져 있습니다.
    `Action`은 `input`을 받아서 js에 기능을 실행해라 하는 명령을 내리게 됩니다. 그럼 js에서 데이터값, 즉 정보를 받아 컨셉으로 전달합니다. <br>
    `Concept`은 개념은 프로그래밍 할때의 변수 유형 및 구조와 비슷합니다.
    ```
    boolean - true, false
    decimal - 소수
    enum - 사전을 구축하기 위해 사용할 수 있는 문자열 중 하나(name, text와 같은 개념)
    name - 유니코드 사용 변수이름
    integer - 소수빼고 모든 수
    qualified - 정규식, 패턴
    ```

3. Layout & Traning <br>
    js에서 받아서 컨셉에 저장되어있는 정보를 어떻게 보여줄지에 대한 부분이 `Layout`이며, 사용자의 발화를 정확하게 인식하여 어떤 기능을 실행할 지에 대한 지표가 되는 부분입니다. <br> `Goal`은 어느 정보를 `output`으로 둘건지 설정이고 두번째는 앞서 말했던 `input` 값입니다. 사용자가 발화할 때 빅스비가 어떤 부분에서 인식해야하는지에 대한 지표.

<br>

## 사용한 API
* [공공데이터 포털](https://www.data.go.kr/index.do) - 공적 마스크 판매 정보 조회 API
* 카카오지도 API - 약국정보조회

## 개발 목표
* 대한민국 국민으로서 시국이 시국인지라 할 수 있는 것을 해야겠다고 생각했습니다. 그래서 Bixby를 통해 공적 마스크 판매처를 알려주는 Bixby Capsule(앱)을 개발하게 되었습니다

<br>

## Capsule update시 갱신할 부분

### capsule.bxb
```javascript
capsule {
	id (playground.maskinfo) //활용도를 만족시키기 위한 playground설정
	version (0.2.7) // Store에서 update & submit하려면 매번 버전을 업그레이드 하여야 함. 동일버전은 승인 X
	format (3)
	targets {
		target (bixby-mobile-ko-KR) //사용 언어 선택
		target (bixby-mobile-en-US) {enabled (false)}
	}

  capsule-imports { // viv.core에서 update참고하여 수정 할 것
    import (viv.core){ as (core)}
    import (viv.time) { as (time) version (3.3.26)}
    import (viv.geo) { as (geo) version (9.27.9)}
    import (viv.self) { as (self) version (4.0.20) }
	}

	permissions { // 유저의 권한을 받아오기 위한 장소, capsule-info.bxb와 연동해야함
    device-location-access
    library-permission (self:profile)
  }
	
	runtime-version (8) { //업데이트 시 Fix할 것
	}
	
	store-countries { //Store Open 장소
		only {
			allow (KR)
		}
	}
	store-sections { //Store Section 선택
		section (TravelAndTransportation)
		section (Local) {
			visibility-constraints {
				country-constraints {
					allowed-list {
	  				allow (KR)
					}
				}
			}
		}
	}
}
```

> [viv.core 버전 업데이트 명시](https://bixbydevelopers.com/dev/docs/dev-guide/developers/library#library-capsule-versions)

<br>

### capsule-info.bxb
```javascript
capsule-info{
  ...
  display-name (마스크 사자)
  developer-name (BixbyCrew)
  ...
  description ("︎︎▶︎ 위치 및 주소기반 마스크 판매점 및 개수 조회 캡슐 ︎︎◀︎ \n\n ○ 마스크 재고에 따라서 충분, 보통, 적음으로 표시하게 됩니다. \n\n ○ 빅스비로 발화할때는 정확한 시,군,구 지역명을 말씀해 주셔야 합니다 \n\n ex) '서울특별시 강남구' or '서울특별시 강남구 논현동'('서울특별시' 와 같이 '시'단위만 입력하는 것은 불가능합니다. 세종특별자치시 제외) \n\n ○ 마스크 정보는 5분(최대 10분) 단위로 갱신됩니다.\n\n ◎ 어려운 환경에서도 공헌해 주시는 약사님, 우체국 종사자분, 하나로 마트 분들께도 감사와 응원 드립니다 ◎")
  ...
  dispatch-name (마스크 사자)

  requested-permissions { //유저 권한 획득
    permission (user-profile-access) {
      justification (Your location will be used to find)
    }
    permission (self:profile) {
      justification (Profile)
    }
  }
}

```

## Usage (대표 발화)

* "충청북도 청주시 서원구"
* "서울 특별시 강남구"
* "주변 마스크 구매할래"
* "주변에서 마스크 사고 싶어"

본 캡슐은 발화에 따라 6가지의 `Action`으로 동작합니다. <br>
`GetPlaceInfo`와 `OpenKakaoMap`, `OpenPhone`, `SearchAddress`, `SearchBirth`, `SearchNear` 이며 주변 마스크를 조회할때는 `SearchNear`를 찾아가며 사용자가 특정위치에서 마스크 구매하고 싶어라고 발화하면 `SearchAddress`를 찾아가게 됩니다. `GetPlaceInfo`는 약국의 정보(오픈시간, 전화번호)를 가져오며, `OpenKakaoMap`, `OpenPhone`는 약국의 위치를 바탕으로 지도정보를 반환, 전화번호를 반환하여 사용자에게 띄워주게 됩니다. `SearchBirth`는 사용자의 생년월일을 바탕으로 해당하는 일이 구매가 가능한지 불가능한지를 판별하게 됩니다.

## 개발에 참고해야하는 사이트
* [https://bixbydevelopers.com](https://bixbydevelopers.com)

## Developer (Bixby Crew SSU)

<table>
    <tr>
        <td align="center" width="135px">
            <a href="https://github.com/97tuna"><img height="100px" width="100px" src="https://avatars3.githubusercontent.com/u/50114556?s=400&v=4"></img></a><br />
            <sub> <b> 97tuna </b> </sub>
        </td>
        <td align="center" width="135px">
            <a href="https://github.com/tony9402"><img height="100px" width="100px" src="https://avatars1.githubusercontent.com/u/30228292?s=460&u=1ff865fa5aee04bc2c09fc2e08042b1f4367c469&v=4"></img></a><br />
            <sub> <b> tony9402 </b> </sub>
        </td>
        <td align="center" width="135px">
            <a href="https://github.com/ika9810"><img height="100px" width="100px" src="https://avatars0.githubusercontent.com/u/44824398?s=400&v=4"></img></a><br />
            <sub> <b> ika9810 </b> </sub>
        </td>
        <td align="center" width="135px">
            <sub> <b> dldudwns </b> </sub>
        </td>
    </tr>
</table>

<!-- 2020.12.27(SUN) [MOD] update README.md -->

