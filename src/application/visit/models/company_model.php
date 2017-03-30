<?php

class Company_Model extends WM_Model {

    public function __construct () {
        parent::__construct();
    }

    public function get($id) {
        $this->db->select('Visit.dbo.generateIdentityCode(cm.id) AS id');
        $this->db->select('cm.name');
        $this->db->select('cm.companyName');
        $this->db->select('cm.slug');
        $this->db->select('cm.taxNumber');
        $this->db->select('cm.address');
        $this->db->select('cm.zipcode');
        $this->db->select('cm.city');
        $this->db->select('cm.state');
        $this->db->select('cm.country');
        $this->db->select('cm.createdAt');
        $this->db->select('cm.customParameters');
        $this->db->select('cm.master');
        $this->db->select('cm.customize');
        $this->db->select('cm.activeProductGroups as productEnabled');

        $this->db->from(Visit_TB_COMPANY . ' cm');

        $this->db->where('cm.id', $id);

        return $this->db->get()->row();
    }

    public function get_by_slug($slug) {
        $this->db->select('Visit.dbo.generateIdentityCode(cm.id) AS id');
        $this->db->select('cm.name');
        $this->db->select('cm.slug');
        $this->db->select('cm.customize');

        $this->db->from(Visit_TB_COMPANY . ' cm');

        $this->db->where('cm.slug', $slug);

        return $this->db->get()->row();
    }

    public function query($condition = null, $order = null) {
        $this->db->select('Visit.dbo.generateIdentityCode(cm.id) AS id');
        $this->db->select('cm.name');
        $this->db->select('cm.companyName');
        $this->db->select('cm.slug');
        $this->db->select('cm.taxNumber');
        $this->db->select('cm.address');
        $this->db->select('cm.zipcode');
        $this->db->select('cm.city');
        $this->db->select('cm.state');
        $this->db->select('cm.country');
        $this->db->select('cm.createdAt');
        $this->db->select('cm.customParameters');
        $this->db->select('cm.master');
        $this->db->select('cm.activeProductGroups');

        $this->db->from(Visit_TB_COMPANY . ' cm');

        $this->configure_condition($condition);

        $this->configure_order($order);

        return $this->db->get()->result();
    }

    public function insert($company) {
        $this->db->trans_begin();
        unset($company->productEnabled);
        $this->db->insert(Visit_TB_COMPANY, $company);

        if( $this->db->trans_status() === FALSE ) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return $this->db->insert_id();
        }
    }

    public function update($company, $id) {
        $this->db->trans_begin();
        unset($company->productEnabled);
        $this->db->update(Visit_TB_COMPANY, $company, "id = ". (int) $id);

        if( $this->db->trans_status() === FALSE ) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
    }
}