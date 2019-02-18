package com.mossle.user.persistence.domain;

// Generated by Hibernate Tools
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * UserAccountType .
 * 
 * @author Lingo
 */
@Entity
@Table(name = "USER_ACCOUNT_TYPE")
public class UserAccountType implements java.io.Serializable {
    private static final long serialVersionUID = 0L;

    /** null. */
    private Long id;

    /** null. */
    private String name;

    /** null. */
    private String description;

    /** null. */
    private String scopeId;

    /** . */
    private Set<UserAccount> userAccounts = new HashSet<UserAccount>(0);

    public UserAccountType() {
    }

    public UserAccountType(Long id) {
        this.id = id;
    }

    public UserAccountType(Long id, String name, String description,
            String scopeId, Set<UserAccount> userAccounts) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.scopeId = scopeId;
        this.userAccounts = userAccounts;
    }

    /** @return null. */
    @Id
    @Column(name = "ID", unique = true, nullable = false)
    public Long getId() {
        return this.id;
    }

    /**
     * @param id
     *            null.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /** @return null. */
    @Column(name = "NAME", length = 50)
    public String getName() {
        return this.name;
    }

    /**
     * @param name
     *            null.
     */
    public void setName(String name) {
        this.name = name;
    }

    /** @return null. */
    @Column(name = "DESCRIPTION", length = 200)
    public String getDescription() {
        return this.description;
    }

    /**
     * @param description
     *            null.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /** @return null. */
    @Column(name = "SCOPE_ID", length = 50)
    public String getScopeId() {
        return this.scopeId;
    }

    /**
     * @param scopeId
     *            null.
     */
    public void setScopeId(String scopeId) {
        this.scopeId = scopeId;
    }

    /** @return . */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userAccountType")
    public Set<UserAccount> getUserAccounts() {
        return this.userAccounts;
    }

    /**
     * @param userAccounts
     *            .
     */
    public void setUserAccounts(Set<UserAccount> userAccounts) {
        this.userAccounts = userAccounts;
    }
}
