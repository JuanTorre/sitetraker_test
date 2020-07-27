/// <reference types="cypress" />

describe('salesforce test', () => {

    it('open page, search for datatable and select Datatable from Inline Edit', () => {

        cy.visit('/')
        //Switch to the Component Reference tab
        cy.xpath('//span[contains(text(),"Component Reference")]', { timeout: 10 * 2000 })
            .click({force: true})

        //asserts that title for Components sections is displayed
        cy.xpath('//h2[@class="slds-text-heading_medium"]').invoke('text').then( text => {
            expect(text).to.equal('Components')
        })
            
        //Search in Quick Find for “datatable”
        cy.xpath('//input[@placeholder="Quick Find"]', { timeout: 10 * 2000 })
            .click({force: true})
            .type("datatable", {force: true})

        //Under Lightning Web Components, click on the Components>lightning>“datatable” on the left menu panel
        cy.xpath('//div[@class="lwc-section slds-m-bottom_medium slds-p-left_medium slds-p-bottom_small"]//componentreference-tree//div[@class="slds-tree_container"]//componentreference-tree-item[@class="slds-tree"]//componentreference-tree-item//div//componentreference-tree-item//span[@class="slds-tree__item-label slds-truncate"][contains(text(),"datatable")]')
            .click({force: true})

        //asserts that Datatable title is displayed
        cy.xpath('//span[@class="slds-page-header__title slds-m-right_small slds-align-middle slds-truncate"]').invoke('text').then( text => {
            expect(text).to.equal('Datatable')
        })

        //Under Example tab on the main pane > select “Datatable from Inline Edit” from the dropdown
        cy.xpath('//input[@placeholder="Choose Example"]')
            .click({force: true})
            .type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}', {force: true})

        cy.wait(5000)

        //Click on the “Open in Playground” button
        cy.xpath('//button[@class="slds-button slds-button_neutral slds-button_last"]')
            .click({force: true})

        //Under the rightmost section “Preview” -> Edit/Update the values for all the columns in row 3 in the table -
        //Label: Larry Page
        //Website: https://google.com
        //Phone number:(555)-755-6575
        //Date Time: Jan 01, 2022 12:57 PM
        //Balance: 770.54
        cy.wait(25000)

        cy.xpath('//componentreference-full-playground[@class="dsc-visible"]//iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)

            .xpath('//div[@class="slds-col preview-container"]//iframe').then($iframe2 => {
                const $body2 = $iframe2.contents().find('main')
                cy.wrap($body2)
                    
                .find('lightning-datatable')
                    .should('not.be.visible')

                .xpath('//span[@class="slds-th__action"]').first()
                    .should('to.be.visible')
            })

        })
    })  

})