using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Группа материала
/// </summary>
public partial class MaterialGroupDict
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Наименование
    /// </summary>
    public string Name { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual ICollection<Material> Materials { get; set; } = new List<Material>();
}
