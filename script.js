// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=postman.com
// @grant        none
// ==/UserScript==

class UserData {
    constructor(template) {
        this.table = document.createElement('div')
        this.count = 0
        this.profile_name = document.querySelector(template.instagram.instagramProfileClass).innerText
    }

    addTableText() {
        this.table.innerHTML = template.table.tableInnerHTML
    }

    addTableStyles() {
        this.table.classList.add(template.table.tableClass)
        this.table.style.cssText = template.table.tableStyles
    }

    addTableToDom() {
        document.querySelector(template.instagram.instagramHeader).append(this.table)
        this.addFollowersListener()
        this.addFollowingsListener()
        this.addPostsListener(template.fetch.fetchPostsUrl)
    }

    userListener(e, word, url) {
        e.stopImmediatePropagation()

        let href = document.querySelector(`a[href="/${this.profile_name}/${word}/"]`),
            count = +href.querySelector('div span').innerText,
            score = 0;
        href.click()

        let scrollUserList = setInterval(() => {
            if(document.querySelector(template.instagram.instagramUsersList)) {
                document.querySelector(template.instagram.instagramUsersList).scrollBy(0, 1000)
                
                score+=12
                if (score > count + 12) {
                    clearInterval(scrollUserList)
                    setTimeout(() => {
                        let names = document.querySelectorAll(template.instagram.instagramUsersNames),
                            descs = document.querySelectorAll(template.instagram.instagramUsersDescs),
                            counter = 0;

                        let fetchData = setInterval(() => {
                            if(names[counter+1] == undefined) {
                                clearInterval(fetchData)
                            }

                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "profile": `${this.profile_name}`,
                                    "username": `${names[counter].innerText}`,
                                    "description": `${descs[counter].innerText}`
                                })
                            })

                            counter++
                        }, 2000)
                        this.count += count
                        document.querySelector(template.table.countClass).innerText = this.count
                    }, 500)
                }
            }
        }, 1500)
    }
    
    addFollowersListener() {
        document.querySelector(template.button.followersButton).addEventListener('click', e => {
            this.userListener(e, 'followers', template.fetch.fetchFollowersUrl)
        })
    }

    addFollowingsListener() {
        document.querySelector(template.button.followingsButton).addEventListener('click', e => {
            this.userListener(e, 'followings' ,template.fetch.fetchFollowingsUrl)
        })
    }

    addPostsListener(url) {
        document.querySelector(template.button.postsButton).addEventListener('click', (e) => {
            e.stopImmediatePropagation()

            let posts_count = +document.querySelector(template.instagram.instagramPostsCount).innerText,
                score = 0,
                allUrls = [];

            let posts_interval = setInterval(() => {
                window.scrollBy(0,1000)
                document.querySelectorAll(template.instagram.instagramPosts).forEach(post => {
                    allUrls.push(post)
                })
                score +=12

                if (score > posts_count + 12) {
                    clearInterval(posts_interval)
                    let uniqueUrls = Array.from(new Set(allUrls)),
                    counter = 0

                    let fetchData = setInterval(() => { 
                        if(uniqueUrls[counter+1] == undefined) {
                            clearInterval(fetchData)
                        }

                        fetch(url, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "profile": `${this.profile_name}`,
                                "url": `${uniqueUrls[counter].href}`
                            })
                        })

                        counter++
                    }, 2000)
                    this.count += posts_count
                    document.querySelector(template.table.countClass).innerText = this.count
                }
            }, 1500)
        })
    }

    render() {
        this.addTableText()
        this.addTableStyles()
        this.addTableToDom()
    }
}

const template = {
    table: {
        tableClass: 'table',
        tableStyles: `padding: 15px;min-width: 200px;height: 200px;border: 2px solid black;border-radius: 5%;position: absolute;left: 955px;`,
        tableInnerHTML: `<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 20px;"><button class="followers" style="background-color:#4CAF50;border:none;color:white;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:4px 2px;cursor:pointer;padding:10px 24px;">Followers</button><button class="followings" style="background-color:#4CAF50;border:none;color:white;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:4px 2px;cursor:pointer;padding:10px 24px;">Followings</button><button class="posts" style="background-color:#4CAF50;border:none;color:white;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:4px 2px;cursor:pointer;padding:10px 24px;">Posts</button></div><div style="text-align: center; margin-top: 40px;">Count<span class="count_span" style="font-weight: 700px">0</span></div>`,
        countClass: '.count_span'
    },
    instagram: {
        instagramHeader: '.zw3Ow',
        instagramProfileClass: '.fDxYl',
        instagramUsersList: '.isgrP',
        instagramUsersNames: ' ._0imsa ._7UhW9',
        instagramUsersDescs: '.DhRcB ._7UhW9',
        instagramPostsCount: '.g47SY',
        instagramPosts: '.v1Nh3 a'
    },
    button: {
        followersButton: '.followers',
        followingsButton: '.followings',
        postsButton: '.posts'
    },
    fetch: {
        fetchFollowersUrl: 'https://inst-inst.loc/api/followers',
        fetchFollowingsUrl: 'https://inst-inst.loc/api/followings',
        fetchPostsUrl : 'https://inst-inst.loc/api/profile-content'
    },

}

window.addEventListener('click', () => {
    if (document.querySelector(template.instagram.instagramHeader)) {
        if(document.querySelector(template.table.tableClass)) {
            document.querySelector(template.table.tableClass).remove()
        }
        let user = new UserData(template)
        user.render()
    }
})