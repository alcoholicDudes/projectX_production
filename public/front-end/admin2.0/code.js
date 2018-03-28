let numUsers;
let userCountHolder = $('#userCount');
let userHolder = $('#userHolder');

getUsers();

function getUsers() {
    userHolder.empty();
    $.ajax({
        url: 'http://localhost:5252/users/all',
        method: 'GET',
        success: renderUsers
    });
}

// adds all users from db to admin panel
function renderUsers(data) {
    // data is object containing all users
    numUsers = data.length;

    let header = `<header class="projects-header">
            <div class="title">User List</div>
            <div class="count" id="userCount">| ${numUsers} Users</div>
            <span class="glyphicon glyphicon-download-alt"></span>
        </header>`;

    let table = `<table class="projects-table table">
                        <thead>
                        <tr>
                            <th>UserId</th>
                            <th>CurrentPoints</th>
                            <th>TotalPoints</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                    </table>`;
    table = $(table);
    userHolder.append(header);
    userHolder.append(table);

    data.forEach(function (user) {
        // for updating num Users in html
        let tableRow;

        if (!user.isBlocked) {
            tableRow = `<tr>
                <td>
                    <p>${user.userId}</p>
                </td>
                <td>
                    <p>${user.currentRespect}</p>
                </td>
                <td>
                    <p>${user.totalRespect}</p>
                </td>
                <td class="member">
                    <div class="member-info">
                        <span class="status-text status-blue" style="margin: 10px"> Good</span>
                    </div>
                </td>
                <td class="status">
                        <select name="options" id="${user.userId}" class="action-box custom-select m-1">
                            <option value="View">View Profile</option>
                            <option value="Lock">Lock Account</option>
                        </select>
                        <button class="btn btn-light m-1" onclick=applyAction(${user.userId})>Apply</button>
                </td>
            </tr>`
        } else {
            tableRow = ` <tr>
                <td>
                    <p>${user.userId}</p>
                </td>
                <td>
                    <p>${user.currentRespect}</p>
                </td>
                <td>
                    <p>${user.totalRespect}</p>
                </td>
                <td class="member">
                    <div class="member-info">
                        <span class="status-text status-red" style="margin: 10px"> Blocked</span>
                    </div>
                </td>
                <td class="status">
                        <select name="options" id="${user.userId}" class="action-box custom-select m-1">
                            <option value="View">View Profile</option>
                            <option value="Unlock">Unlock Account</option>
                        </select>
                        <button class="btn btn-light m-1" onclick=applyAction(${user.userId})>Apply</button>
                </td>
            </tr>`
        }
        table.append(tableRow);
    });
}

// block user or view profile option for admin
function applyAction(userID) {
    let actionBox = $('#' + userID);
    let action = actionBox.val();
    if (action == 'View') {
        window.location = '../profile-viewer/index.html?userId=' + userID;
    } else if (action == 'Lock') {
        $.ajax({
            url: 'http://localhost:5252/users/' + userID,
            method: 'PUT',
            data: {
                isBlocked: true
            },
            success: getUsers
        });
    } else {
        $.ajax({
            url: 'http://localhost:5252/users/' + userID,
            method: 'PUT',
            data: {
                isBlocked: false
            },
            success: getUsers
        });
    }
}