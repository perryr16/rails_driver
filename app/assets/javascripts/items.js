function itemCard(item, merchant) {
  let name = item.attributes.name
  let description = item.attributes.description
  let unit_price = item.attributes.unit_price

  let card = `
    <div class="card">
      <div class="card-body">
        <h3 class="card-title"><a href='/items/${item.id}'>${name}</a></h3>
        <p>Merchant: ${merchant} </p> 
        <p>Price: ${unit_price}</p>
        <p class="card-text">${description}</p>
      </div>
    </div>
  `
  return card
}

function loadAllItems(container) {
  let uri = "/api/v1/items"
  loadMultipleResources(uri, function(item){
    card = itemCard(item)
    container.append(card)
  })
}

let merchantName = function (item_id) {
  fetch(`http://localhost:3000/api/v1/items/${item_id}/merchant`)
    .then(response => response.json())
    .then(merchantData => { merchantName = merchantData.data.attributes.name })
}

function loadItem(item_id, itemContainer) {
  let uri = `/api/v1/items/${item_id}`
  // let mName = merchName(item_id)
  loadResource(uri, function(item){
    card = itemCard(item, merchantName)
    itemContainer.append(card)
  })
}


function loadMerchantItems(merchant_id, container) {
  let uri = `/api/v1/merchants/${merchant_id}/items`
  loadMultipleResources(uri, function(item){
    item_element = itemCard(item, merchName)
    container.append(item_element)
  })
}
