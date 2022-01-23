import AsyncStorage from '@react-native-async-storage/async-storage';
const siteData = {
    siteurl: 'http://localhost:19006/',

    // Login Screen
    usernameField: '[role="button"][aria-label="getstarted"]',
    passwordField: '[role="button"][aria-label="getstarted"]',
};

const welcomeScreenData = {
    urlPath: '/welcome',
    getstartedButton: '[role="button"][aria-label="getstarted"]',
};

const loginScreenData = {
    urlPath: '/login',
    usernameField: 'input[aria-label="username"]',
    passwordField: 'input[aria-label="password"]',
    loginButton: '[role="button"][aria-label="login"]',
    signupButton: '[role="button"][aria-label="signup"]',
    userprofileButton: '[role="button"][aria-label="userprofile"]',
    qaStart: '[role="button"][aria-label="qaStart"]',
    profilesubname: 'input[aria-label="profilename"]]',
    toqapage0: '[role="button"][aria-label="toqapage0"]',
    username: 'kkk',
    password: 'Bear@123'
};

const homeScreenData = {
    urlPath: '/',
    logoutButton: '[aria-label="logout"]'
};

const questionData = {
    btn_all: '[role="button"][aria-label="btn_all"]',
    btn_answered: '[role="button"][aria-label="btn_answered"]',
    btn_unanswered: '[role="button"][aria-label="btn_unanswered"]',
    testbtn1: '[role="button"][aria-label="0testbtn0"]',
    testbtn2: '[role="button"][aria-label="0testbtn1"]',
    testbtn3: '[role="button"][aria-label="1testbtn0"]',
    testbtn4: '[role="button"][aria-label="1testbtn1"]',
    editbtn: '[role="button"][aria-label="editbtn"]',
    qasavebtn: '[role="button"][aria-label="qasavebtn"]',
};

describe('Login Flow Test', () => {
    it('Welcome Screen', () => {
        cy.visit(siteData.siteurl);
        cy.get(welcomeScreenData.getstartedButton).as('getstarted-button');

        cy.get('@getstarted-button').click();

        expect(cy.url().should('include', loginScreenData.urlPath));
    })

    it('Login Screen', () => {
        cy.get(loginScreenData.usernameField).as('username');
        cy.get(loginScreenData.passwordField).as('password');
        cy.get(loginScreenData.loginButton).as('login-button');

        cy.get('@username').type(loginScreenData.username); 
        cy.get('@password').type(loginScreenData.password);

        cy.get('@login-button').click();
        cy.window().then((window) => {
            window.localStorage.setItem('ddd', 'value')
        })
        cy.wait(12000);



        expect(cy.url().should('include', homeScreenData.urlPath));
    })

    it('Profile Screen', () => {
        cy.get(loginScreenData.userprofileButton).as('userprofile-button');
        cy.get('@userprofile-button').click();
        // cy.get(loginScreenData.profilesubname).as('profilesubname');
        // const num2 = cy.get('@password'); alert(num2)

        // expect(num2).to.eq('kk');
        cy.wait(3500);
    })

    it('To QA Screen', () => {
        cy.get(loginScreenData.toqapage0).as('toqapage0');
        cy.get('@toqapage0').click();
        cy.wait(3500);
    })

    it('Question/Answere', () => {
        cy.get(questionData.btn_all).as('btn_all');
        cy.get(questionData.btn_answered).as('btn_answered');
        cy.get(questionData.btn_unanswered).as('btn_unanswered');
        cy.get(questionData.testbtn1).as('testbtn1');
        cy.get(questionData.testbtn2).as('testbtn2');
        cy.get(questionData.testbtn3).as('testbtn3');
        cy.get(questionData.testbtn4).as('testbtn4');
        cy.get(questionData.editbtn).as('editbtn');
        cy.get(questionData.qasavebtn).as('qasavebtn');
        cy.wait(1500);
        cy.get('@btn_answered').click();
        cy.wait(1500);

        cy.get('@editbtn').click();
        cy.wait(1500);

        cy.get('@testbtn3').click();
        cy.wait(1500);
        cy.get('@testbtn4').click();
        cy.wait(1500);

        cy.get('@btn_unanswered').click();
        cy.wait(1500);
        cy.get('@testbtn1').click();
        cy.wait(1500);
        cy.get('@testbtn2').click();
        cy.wait(1500);

        cy.get('@btn_all').click();
        cy.wait(1500);
        cy.get('@testbtn3').click();
        cy.wait(1500);
        cy.get('@testbtn4').click();
        cy.wait(1500);

        cy.get('@qasavebtn').click();
        cy.wait(1500);
        cy.get('@qasavebtn').click();
        cy.wait(1500);
    })
})
